import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  onScrollToNext: () => void;
}

export default function HeroSection({
  id,
  bgColor,
  onScrollToNext,
}: HeroSectionProps) {
  const { ref: inViewRef, inView: isInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.section
      id={id}
      ref={inViewRef}
      className='relative min-h-screen bg-gradient-to-b from-gray-950 to-blue-950/90'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-20' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950' />
      </div>

      <div className='relative z-10'>
        <Navbar isFixed={false} />

        <div className='mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8'>
          {/* Hero Content */}
          <div className='grid gap-12 lg:grid-cols-2 lg:gap-24'>
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='max-w-2xl'
            >
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='mb-8 inline-flex items-center gap-3 rounded-full border border-blue-500/10 bg-gradient-to-r from-blue-500/5 via-blue-400/5 to-transparent px-5 py-2 backdrop-blur-sm'
              >
                <span className='bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-sm font-medium text-transparent'>
                  Genetic Screening • AI Diagnostics • Global Healthcare
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='mb-6 font-light text-5xl tracking-tight text-white lg:text-7xl'
              >
                Transforming
                <br />
                <span className='bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent'>
                  CCM Diagnostics
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='mb-8 text-xl leading-relaxed text-neutral-300'
              >
                Building accessible diagnostic tools for cerebral cavernous
                malformations, bringing advanced screening capabilities to
                underserved communities worldwide.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='mt-12 grid grid-cols-2 gap-8'
              >
                <div>
                  <p className='text-3xl font-semibold text-white'>95%+</p>
                  <p className='mt-2 text-sm text-blue-200/60'>
                    Diagnostic Accuracy
                  </p>
                </div>
                <div>
                  <p className='text-3xl font-semibold text-white'>90%</p>
                  <p className='mt-2 text-sm text-blue-200/60'>
                    Cost Reduction
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative hidden lg:block'
            >
              <div className='absolute -right-20 top-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]' />
              <div className='aspect-square relative rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent p-8 backdrop-blur-sm'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent' />
                {/* Add your product visualization/image here */}
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2'
          >
            <button
              onClick={onScrollToNext}
              className='group flex flex-col items-center gap-2'
            >
              <span className='text-sm text-blue-200/60'>
                Explore Our Solutions
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className='h-12 w-px bg-gradient-to-b from-blue-500/50 to-transparent'
              />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
