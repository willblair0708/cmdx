"use client";

import Image from 'next/image';
import Link from 'next/link';
import useHash from '@/hooks/use-hash';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import MobileMenu from './MobileMenu';

const navItems = [
  { text: 'Home', href: '#home' },
  { text: 'Platform', href: '#platform' },
  { text: 'About', href: '#mission' },
] as const;

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

interface NavbarProps {
  isFixed?: boolean;
}

export default function Navbar({ isFixed = true }: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Define section IDs here.
  const sectionIds = ['home', 'platform', 'mission', 'contact'];
  // Call the hook inside the component.
  const activeSection = useHash(sectionIds);

  // Animate the gradient overlay.
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    [
      'linear-gradient(to bottom, rgba(10,25,47,0), rgba(10,25,47,0))',
      'linear-gradient(to bottom, rgba(10,25,47,0.8), rgba(125,10,12,0.2))',
    ]
  );

  // Border radius animates from 0 to 20px.
  const borderRadius = useTransform(scrollY, [0, 100], ['0px', '20px']);

  // Compress the navbar width from 100% to 70%.
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '70%']);

  // Compress vertical padding from 1rem to 0.25rem.
  const navPaddingY = useTransform(scrollY, [0, 100], ['1rem', '0.25rem']);

  // Add a subtle red box-shadow when scrolled.
  const navBoxShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0px 4px 8px rgba(169,10,12,0.2)']
  );

  // Fade out the logo as you scroll.
  const logoOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <motion.nav
      style={{
        // Use a slightly transparent base color.
        backgroundColor: 'rgba(9,25,47,0.85)',
        // Apply the gradient overlay.
        backgroundImage: navBackground,
        // Remove backgroundBlendMode to keep the gradient effect.
        borderRadius,
        width: navWidth,
        boxShadow: navBoxShadow,
        paddingTop: navPaddingY,
        paddingBottom: navPaddingY,
      }}
      initial={false}
      animate="visible"
      // Center the navbar—remove full-width classes.
      className={`${
        isFixed ? 'fixed' : 'absolute'
      } left-1/2 -translate-x-1/2 z-50 flex items-center justify-between border-b border-white/5 px-6 sm:px-12`}
    >
      <NavLogo style={{ opacity: logoOpacity }} />
      <DesktopMenu pathname={pathname} activeSection={activeSection} />
      <MobileMenuButton toggleMenu={toggleMenu} />
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <MobileMenu toggleMenu={toggleMenu} navItems={navItems} />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Accept a style prop to allow dynamic opacity.
const NavLogo = memo(({ style }: { style?: any }) => (
  <motion.div style={style} variants={navItemVariants} className="flex items-center">
    <Link href="/" scroll={false}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="transition-all duration-300"
      >
        <Image
          src="/assets/axonara.svg"
          alt="Axonara Bio Logo"
          width={120}
          height={32}
          className="h-12 w-auto drop-shadow-lg"
        />
      </motion.div>
    </Link>
  </motion.div>
));

NavLogo.displayName = 'NavLogo';

interface DesktopMenuProps {
  pathname: string;
  activeSection: string;
}

const DesktopMenu = memo(({ pathname, activeSection }: DesktopMenuProps) => (
  <motion.div
    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    className="hidden items-center gap-10 sm:flex"
  >
    {navItems.map((item) => (
      <NavItem key={item.text} item={item} activeSection={activeSection} />
    ))}
    <ContactButton />
  </motion.div>
));

DesktopMenu.displayName = 'DesktopMenu';

interface NavItemProps {
  item: (typeof navItems)[number];
  activeSection: string;
}

const NavItem = memo(({ item, activeSection }: NavItemProps) => {
  const isActive = activeSection === `#${item.href.replace('#', '')}` && activeSection !== "#contact";

  return (
    <motion.div variants={navItemVariants} className="group relative">
      <Link
        href={item.href}
        className="relative text-sm font-medium tracking-wide text-white/70 transition-all duration-300 hover:text-white"
      >
        <span className="flex items-center">{item.text}</span>
        {/* Underline that appears when active */}
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-[2px]"
          style={{ backgroundColor: "#A90A0C" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#A90A0C]/80 to-[#A90A0C]/40"
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
});

NavItem.displayName = 'NavItem';

const ContactButton = memo(() => {
  // Use local scroll for ContactButton.
  const { scrollY } = useScroll();
  // Animate container padding.
  const padX = useTransform(scrollY, [0, 100], ['1.5rem', '0rem']);
  const padY = useTransform(scrollY, [0, 100], ['0.625rem', '0rem']);
  // Animate background and border to transparent.
  const buttonBg = useTransform(
    scrollY,
    [0, 100],
    [
      'linear-gradient(to right, rgba(169,10,12,0.1), transparent)',
      'transparent',
    ]
  );
  const borderColor = useTransform(scrollY, [0, 100], [
    'rgba(169,10,12,0.2)',
    'transparent',
  ]);
  // Fade out and compress the text.
  const textOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  // Animate flex basis from full (1) to 0 so it no longer takes space.
  const textFlex = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div variants={navItemVariants}>
      <Link href="#contact" scroll={true}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            paddingLeft: padX,
            paddingRight: padX,
            paddingTop: padY,
            paddingBottom: padY,
            background: buttonBg,
            borderColor: borderColor,
          }}
          // Remove gap and force centering with flex
          className="group relative flex items-center justify-center rounded-full border text-sm font-medium tracking-wide text-white shadow-lg transition-all duration-300"
        >
          <motion.span
            style={{ opacity: textOpacity, flex: textFlex, overflow: 'hidden' }}
            className="relative z-10 transition-transform duration-300"
          >
            CONTACT
          </motion.span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 h-4 w-4 text-[#A90A0C] transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </motion.svg>
        </motion.button>
      </Link>
    </motion.div>
  );
});

ContactButton.displayName = 'ContactButton';

const MobileMenuButton = memo(({ toggleMenu }: { toggleMenu: () => void }) => (
  <motion.button
    variants={navItemVariants}
    className="flex items-center sm:hidden"
    onClick={toggleMenu}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label="Toggle mobile menu"
  >
    <svg
      width="28"
      height="8"
      viewBox="0 0 28 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#A90A0C]"
    >
      <path
        d="M0.5 1H28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M0.5 7H28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </motion.button>
));

MobileMenuButton.displayName = 'MobileMenuButton';






