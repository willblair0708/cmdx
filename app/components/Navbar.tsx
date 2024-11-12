'use client';

import Image from 'next/image';
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
  { text: 'About', href: '/about' },
] as const;

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 25, 47, 0)', 'rgba(10, 25, 47, 0.98)']
  );

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      initial={false}
      animate='visible'
      className={`${
        isFixed ? 'fixed' : 'absolute'
      } left-0 right-0 z-50 flex w-full items-center justify-between border-b border-white/5 px-6 py-4 sm:px-12 sm:py-5`}
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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='transition-all duration-300'
      >
        <Image
          src='/assets/axonara.svg'
          alt='Axonara Bio Logo'
          width={120}
          height={32}
          className='h-12 w-auto drop-shadow-lg'
        />
      </motion.div>
    </Link>
  </motion.div>
));

NavLogo.displayName = 'NavLogo';

const DesktopMenu = memo(({ pathname }: { pathname: string }) => (
  <motion.div
    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    className='hidden items-center gap-10 sm:flex'
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
          className='relative text-sm font-medium tracking-wide text-white/70 transition-all duration-300 hover:text-white'
          scroll={false}
        >
          <span className='flex items-center'>{item.text}</span>
          <motion.div
            className={`absolute -bottom-1 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#A90A0C] to-[#A90A0C]/80`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isActive ? 1 : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className='absolute -bottom-1 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#A90A0C]/80 to-[#A90A0C]/40'
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </Link>
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
        className='group relative flex items-center gap-2 overflow-hidden rounded-full border border-[#A90A0C]/20 bg-gradient-to-r from-[#A90A0C]/10 to-transparent px-6 py-2.5 text-sm font-medium tracking-wide text-white shadow-lg shadow-[#A90A0C]/5 transition-all duration-300 hover:border-[#A90A0C]/30 hover:shadow-xl hover:shadow-[#A90A0C]/10'
      >
        <span className='relative z-10 transition-transform duration-300 group-hover:translate-x-[-4px]'>
          CONTACT
        </span>
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          className='relative z-10 h-4 w-4 text-[#A90A0C] transition-all duration-300 group-hover:translate-x-1'
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
        <div className='absolute inset-0 -z-10 bg-gradient-to-r from-[#A90A0C]/0 via-[#A90A0C]/20 to-[#A90A0C]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
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
      className='text-[#A90A0C]'
    >
      <path
        d='M0.5 1H28'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M0.5 7H28'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  </motion.button>
));

MobileMenuButton.displayName = 'MobileMenuButton';
