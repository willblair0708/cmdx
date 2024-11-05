import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import GuestOSIcon from '@/public/assets/ui/GuestOSIcon';

import MobileMenu from './MobileMenu';

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'About', href: '/about' },
] as const;

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

interface NavbarProps {
  isFixed?: boolean;
}

export default function Navbar({ isFixed = true }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <motion.nav
      initial='hidden'
      animate='visible'
      className={`${
        isFixed ? 'fixed backdrop-blur-sm' : 'absolute'
      } left-0 right-0 z-50 flex w-full items-center justify-between px-4 py-6`}
    >
      <NavLogo />
      <DesktopMenu pathname={pathname} />
      <MobileMenuButton toggleMenu={toggleMenu} />
      <AnimatePresence mode='wait'>
        {isMenuOpen && (
          <MobileMenu
            pathname={pathname}
            toggleMenu={toggleMenu}
            navItems={navItems}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const NavLogo = memo(() => (
  <motion.div variants={navItemVariants} className='flex items-center'>
    <Link href='/' scroll={false}>
      <span className='text-2xl font-book tracking-tight text-white transition-opacity hover:opacity-80 sm:text-3xl'>
        GuestOS
      </span>
    </Link>
  </motion.div>
));

NavLogo.displayName = 'NavLogo';

const DesktopMenu = memo(({ pathname }: { pathname: string }) => (
  <motion.div
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    className='hidden items-center space-x-8 sm:flex sm:space-x-12'
  >
    {navItems.map((item) => (
      <NavItem key={item.text} item={item} pathname={pathname} />
    ))}
    <ContactButton />
  </motion.div>
));

DesktopMenu.displayName = 'DesktopMenu';

const NavItem = memo(
  ({
    item,
    pathname,
  }: {
    item: (typeof navItems)[number];
    pathname: string;
  }) => {
    const isActive = pathname === item.href;

    return (
      <motion.div variants={navItemVariants} className='group relative'>
        <Link
          href={item.href}
          className='text-sm font-book tracking-wide text-white/90 transition-colors hover:text-white'
          scroll={false}
        >
          <span className='flex items-center'>
            {item.text}
            <AnimatePresence mode='wait'>
              {isActive && (
                <motion.div
                  className='absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-white via-white/80 to-white/30'
                  layoutId='activeIndicator'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
                />
              )}
            </AnimatePresence>
          </span>
        </Link>
        <motion.div
          className='absolute -bottom-1 left-0 right-0 h-px origin-left bg-white/20'
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    );
  }
);

NavItem.displayName = 'NavItem';

const ContactButton = memo(() => (
  <motion.div variants={navItemVariants}>
    <Link href='/contact' scroll={false}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='group flex items-center space-x-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20'
      >
        <span className='font-book tracking-wide text-white'>Book Demo</span>
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 stroke-white transition-transform duration-300 group-hover:translate-x-0.5'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75'
          />
        </motion.svg>
      </motion.button>
    </Link>
  </motion.div>
));

ContactButton.displayName = 'ContactButton';

const MobileMenuButton = memo(({ toggleMenu }: { toggleMenu: () => void }) => (
  <motion.button
    variants={navItemVariants}
    className='flex items-center sm:hidden'
    onClick={toggleMenu}
    aria-label='Toggle mobile menu'
  >
    <div className='space-y-2'>
      <motion.div className='h-px w-8 bg-white/80' />
      <motion.div className='h-px w-6 bg-white/60' />
    </div>
  </motion.button>
));

MobileMenuButton.displayName = 'MobileMenuButton';
