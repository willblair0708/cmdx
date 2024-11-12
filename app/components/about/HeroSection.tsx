import Image from 'next/image';
import { useRef } from 'react';

import { motion } from 'framer-motion';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const HERO_IMAGE_DIMENSIONS = {
  width: 1920,
  height: 1080,
  mobileWidth: 828,
  mobileHeight: 1792,
};

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Elements */}
      <div className='absolute inset-0'>
        {/* Hero Image */}
        <Image
          src='/assets/about/about_header.webp'
          alt='About Axonara Bio'
          fill
          quality={95}
          priority
          className='object-cover'
          sizes={`(max-width: 768px) ${HERO_IMAGE_DIMENSIONS.mobileWidth}px, ${HERO_IMAGE_DIMENSIONS.width}px`}
        />

        {/* Enhanced Gradient Overlays */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#0A192F]/95 via-[#0A192F]/80 to-[#0A192F]/90' />
        <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.03]' />
        <div className='bg-gradient-radial absolute inset-0 from-[#A90A0C]/5 via-transparent to-transparent' />

        {/* Ambient Light Effects */}
        <div className='absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-[#A90A0C]/5 blur-[120px]' />
        <div className='absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-[#112240]/20 blur-[120px]' />
      </div>

      <Navbar isFixed={false} />

      <div className='relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl'>
          {/* Heritage Badge */}
          <motion.div
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mb-8 inline-flex items-center gap-3 rounded-full border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent px-5 py-2 backdrop-blur-sm'
          >
            <div className='h-1.5 w-1.5 rounded-full bg-[#A90A0C]' />
            <span className='text-sm font-medium text-white/80'>
              Innovation • Impact • Legacy
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className={`mb-8 font-light ${isMobile ? 'text-4xl' : 'text-5xl lg:text-7xl'} tracking-tight text-white`}
          >
            Transforming CCM
            <br />
            <span className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
              Diagnostics
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mb-12 max-w-2xl text-lg leading-relaxed text-white/70'
          >
            Born from personal experience with CCM, we're on a mission to
            revolutionize early detection and monitoring through advanced
            technology and global collaboration.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial='initial'
            animate='animate'
            className='grid gap-6 sm:grid-cols-3'
          >
            Research Impact
            {/* <motion.div variants={itemVariants} className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <p className='mb-2 text-3xl font-semibold text-white'>95%</p>
              <p className='text-sm text-white/60'>Detection Accuracy</p>
            </motion.div> */}
            {/* Global Reach */}
            {/* <motion.div variants={itemVariants} className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <p className='mb-2 text-3xl font-semibold text-white'>90%</p>
              <p className='text-sm text-white/60'>Cost Reduction</p>
            </motion.div> */}
            {/* Innovation */}
            {/* <motion.div variants={itemVariants} className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <p className='mb-2 text-3xl font-semibold text-white'>2+</p>
              <p className='text-sm text-white/60'>Patents Pending</p>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
