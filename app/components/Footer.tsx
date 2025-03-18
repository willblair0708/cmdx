import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import * as SocialIcons from '@/public/assets/footer';

// Constants
const FOOTER_LINKS = [
  {
    title: 'PLATFORM',
    links: [
      { name: 'Our Platform', href: '#platform' },
    ],
  },
  // {
  //   title: 'RESOURCES',
  //   links: [
  //     { name: 'Research', href: '/research' },
  //     { name: 'Publications', href: '/publications' },
  //     { name: 'Case Studies', href: '/case-studies' },
  //   ],
  // },
  {
    title: 'COMPANY',
    links: [
      { name: 'About', href: '#mission' },
      { name: 'Contact', href: '#contact' },
    ],
  },
];

const SOCIAL_ICONS = [
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com',
    Icon: SocialIcons.LinkedInIcon,
  },
  {
    name: 'twitter',
    href: 'https://twitter.com',
    Icon: SocialIcons.TwitterIcon,
  },
];

// Animation variants
const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 35,
    },
  },
};

const successVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

// Components
const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) => (
  <motion.div variants={itemVariants} className='font-book'>
    <h3 className='mb-6 select-none text-[11px] font-medium tracking-[0.2em] text-white/50'>
      {title}
    </h3>
    <ul className='space-y-4'>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            className='group relative inline-flex items-center text-sm tracking-wide text-white/40 transition-all duration-300 hover:text-white'
          >
            <motion.span
              className='relative flex items-center'
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {link.name}
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                className='ml-1 h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                />
              </motion.svg>
              <motion.div
                className='absolute -bottom-px left-0 h-[1px] w-0 bg-gradient-to-r from-[#A90A0C]/60 via-[#A90A0C]/30 to-transparent transition-all duration-300 group-hover:w-full'
                layoutId={`underline-${link.name}`}
              />
            </motion.span>
          </Link>
        </li>
      ))}
    </ul>
  </motion.div>
);

const SocialIcon = memo(({ icon }: { icon: (typeof SOCIAL_ICONS)[number] }) => (
  <motion.a
    href={icon.href}
    target='_blank'
    rel='noopener noreferrer'
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className='group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#A90A0C]/10 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-sm transition-all duration-300 hover:border-[#A90A0C]/20'
  >
    <motion.div className='absolute inset-0 bg-gradient-to-tr from-[#A90A0C]/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    <motion.div className='relative text-white/60 transition-colors duration-300 group-hover:text-white'>
      <icon.Icon color='currentColor' />
    </motion.div>
  </motion.a>
));

const Footer: React.FC = () => {
  return (
    <motion.footer className='relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F] text-white'>
      {/* Subtle background elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(169,10,12,0.05),transparent_50%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(169,10,12,0.08),transparent_50%)]' />
      <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.02] mix-blend-overlay' />

      <div className='max-w-9xl mx-auto flex h-full flex-col justify-between px-6 py-12 sm:px-8 lg:px-12'>
        <motion.div
          variants={containerVariants}
          className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'
        >
          {/* Company Info */}
          <motion.div
            variants={itemVariants}
            className='col-span-full lg:col-span-1'
          >
            <Link href='/' className='group inline-block'>
              <Image
                src='/assets/axonara.svg'
                alt='Axonara Bio Logo'
                width={120}
                height={32}
                className='h-12 w-auto drop-shadow-lg'
              />
            </Link>
          </motion.div>

          {/* Footer Sections */}
          {FOOTER_LINKS.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          className='mt-12 flex flex-col items-center justify-between border-t border-[#A90A0C]/[0.08] pt-8 sm:flex-row'
        >
          <motion.p
            variants={itemVariants}
            className='text-xs tracking-wider text-white/30'
          >
            &copy; {new Date().getFullYear()} Axonara Biosciences, Inc. All rights
            reserved.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className='mt-4 flex space-x-6 sm:mt-0'
          >
            <Link
              href='/privacy'
              className='text-xs text-white/40 hover:text-[#A90A0C]'
            >
              Privacy Policy
            </Link>
            <Link
              href='/terms'
              className='text-xs text-white/40 hover:text-[#A90A0C]'
            >
              Terms of Service
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
