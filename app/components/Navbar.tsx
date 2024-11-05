'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import VBIcon from '@/public/assets/ui/VBIcon';

import MobileMenu from './MobileMenu';

const navItems = [
  { text: 'Home', href: '/' },
  { text: 'Platform', href: '/platform' },
  { text: 'Non-Profit', href: '/non-profit' },
] as const;

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

interface NavbarProps {
  isFixed?: boolean;
}

export default function Navbar({ isFixed = true }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']
  );

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      initial={false}
      animate='visible'
      className={`${
        isFixed ? 'fixed' : 'absolute'
      } left-0 right-0 z-50 flex w-full items-center justify-between px-6 py-4 sm:px-12 sm:py-5`}
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
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className='transition-all duration-300'
      >
        <VBIcon
          size={72}
          className='sm:size-58 text-white transition-all duration-300 hover:text-emerald-300'
        />
      </motion.div>
    </Link>
  </motion.div>
));

NavLogo.displayName = 'NavLogo';

const DesktopMenu = memo(({ pathname }: { pathname: string }) => (
  <motion.div
    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    className='hidden items-center gap-10 sm:flex sm:gap-14'
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
          className='text-base font-medium tracking-wide text-white/90 transition-all hover:text-white'
          scroll={false}
        >
          <span className='flex items-center gap-2'>
            <AnimatePresence mode='wait'>
              {isActive && (
                <motion.span
                  className='h-1.5 w-1.5 rounded-full bg-emerald-300'
                  layoutId='activeDot'
                  initial={false}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                />
              )}
            </AnimatePresence>
            {item.text}
          </span>
        </Link>
        <motion.div
          className='absolute -bottom-1 left-0 right-0 h-[2px] origin-left bg-emerald-300'
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className='group relative flex items-center gap-2 overflow-hidden rounded-full bg-emerald-500/10 px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:bg-emerald-500/20'
      >
        <span className='relative z-10 transition-transform duration-300 group-hover:translate-x-[-4px]'>
          CONTACT
        </span>
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          className='relative z-10 h-4 w-4 text-emerald-300 transition-all duration-300 group-hover:translate-x-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </motion.svg>
        <div className='absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
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
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label='Toggle mobile menu'
  >
    <svg
      width='28'
      height='8'
      viewBox='0 0 28 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='text-emerald-300'
    >
      <path d='M0.5 1H28' stroke='currentColor' strokeWidth='1.5' />
      <path d='M0.5 7H28' stroke='currentColor' strokeWidth='1.5' />
    </svg>
  </motion.button>
));

MobileMenuButton.displayName = 'MobileMenuButton';
