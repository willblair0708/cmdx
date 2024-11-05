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
    title: 'PRODUCTS',
    links: [
      { name: 'Hotels', href: '/products/hotels' },
      { name: 'Parks', href: '/products/parks' },
      { name: 'Reserves', href: '/products/reserves' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

const SOCIAL_ICONS = [
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/company/guestos-ai',
    Icon: SocialIcons.LinkedInIcon,
  },
  // {
  //   name: 'youtube',
  //   href: 'https://www.youtube.com/guestos_ai',
  //   Icon: SocialIcons.YoutubeIcon,
  // },
  {
    name: 'twitter',
    href: 'https://twitter.com/guestos_ai',
    Icon: SocialIcons.TwitterIcon,
  },
  // {
  //   name: 'instagram',
  //   href: 'https://www.instagram.com/guestos_ai',
  //   Icon: SocialIcons.InstagramIcon,
  // },
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
                className='absolute -bottom-px left-0 h-[1px] w-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent transition-all duration-300 group-hover:w-full'
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
    className='group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-sm transition-all duration-300 hover:border-white/20'
  >
    <motion.div className='absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    <motion.div className='relative text-white/60 transition-colors duration-300 group-hover:text-white'>
      <icon.Icon color='currentColor' />
    </motion.div>
  </motion.a>
));

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      'https://app.loops.so/api/newsletter-form/cm2sddtg5037da0trsg1hhngw',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
        }),
      }
    );

    setEmail('');
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <motion.footer
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      className='relative h-[350px] overflow-hidden bg-gradient-to-b from-black/90 to-black/95 backdrop-blur-sm'
    >
      <motion.div
        className='absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <div className='max-w-9xl mx-auto flex h-full flex-col justify-between px-6 py-12 sm:px-8 lg:px-12'>
        <motion.div
          variants={containerVariants}
          className='grid gap-12 sm:grid-cols-2 lg:grid-cols-4'
        >
          <motion.div
            variants={itemVariants}
            className='col-span-full lg:col-span-1'
          >
            <Link href='/' className='group inline-block'>
              <span className='text-2xl font-book tracking-tight text-white/90 transition-all duration-300 group-hover:text-white'>
                Guest<span className='font-light tracking-tighter'>OS</span>
              </span>
              <motion.div className='mt-1 h-[1px] w-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent transition-all duration-300 group-hover:w-full' />
            </Link>
            <p className='mt-8 max-w-sm text-sm leading-relaxed tracking-wide text-white/40'>
              Enhancing human connection through AI-powered hospitality
              experiences.
            </p>
          </motion.div>

          {FOOTER_LINKS.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}

          <motion.div
            variants={itemVariants}
            className='col-span-full lg:col-span-1'
          >
            <h3 className='mb-6 text-[11px] font-medium tracking-[0.2em] text-white/50'>
              NEWSLETTER
            </h3>
            <form onSubmit={handleSubmit} className='relative'>
              <AnimatePresence mode='wait'>
                {!showSuccess ? (
                  <motion.div variants={formVariants} className='relative'>
                    <input
                      type='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='h-12 w-full rounded-lg border border-white/10 bg-gray-900/80 px-4 text-sm text-white backdrop-blur-sm transition-all duration-300 placeholder:text-white/30 hover:border-white/20 focus:border-white/30 focus:outline-none focus:ring-[1px] focus:ring-white/30'
                    />
                    <AnimatePresence>
                      {email && (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          type='submit'
                          className='absolute right-2 top-2 rounded-md bg-gradient-to-b from-white/10 to-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:from-white/20 hover:to-white/10'
                        >
                          <span className='relative flex items-center'>
                            Subscribe
                            <motion.svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='ml-2 h-5 w-4'
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
                          </span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={successVariants}
                    className='flex h-12 items-center rounded-lg border border-white/20 bg-gradient-to-b from-white/[0.08] to-transparent px-4 text-sm text-white/90 backdrop-blur-sm'
                  >
                    <span className='flex items-center'>
                      Thank you for subscribing
                      <motion.svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='ml-2 h-4 w-4 text-white/80'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </motion.svg>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className='flex flex-col items-center justify-between border-t border-white/[0.08] pt-6 sm:flex-row'
        >
          <motion.div variants={itemVariants} className='flex space-x-6'>
            {SOCIAL_ICONS.map((icon) => (
              <SocialIcon key={icon.name} icon={icon} />
            ))}
          </motion.div>
          <motion.p
            variants={itemVariants}
            className='mt-6 text-xs tracking-wider text-white/30 sm:mt-0'
          >
            &copy; {new Date().getFullYear()} GuestOS. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
