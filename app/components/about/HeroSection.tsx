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
      className='relative min-h-screen overflow-hidden bg-[#0A192F]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Dynamic Background Elements */}
      <div className='absolute inset-0'>
        {/* Base Gradient */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F]' />

        {/* Neural Network Effect */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute inset-0'
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(169,10,12,0.05) 0%, transparent 50%)',
          }}
        />

        {/* Grid Pattern */}
        <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.03]' />

        {/* Dynamic Gradients */}
        <motion.div
          animate={{
            opacity: [0.5, 0.3, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-[#A90A0C]/10 blur-[120px]'
        />
      </div>

      <Navbar isFixed={false} />

      <div className='relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl'>
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
            className={`mb-8 font-light ${
              isMobile ? 'text-4xl' : 'text-5xl lg:text-7xl'
            } tracking-tight text-white`}
          >
            Transforming CCM
            <br />
            <span className='relative'>
              <span className='relative z-10 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent'>
                Diagnostics
              </span>
              <motion.span
                className='absolute -inset-x-6 -inset-y-2 z-0 hidden skew-x-12 bg-[#A90A0C]/10 blur-xl lg:block'
                animate={{
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
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
