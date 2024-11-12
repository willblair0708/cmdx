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
      className='relative min-h-screen bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F]'
    >
      {/* Background Pattern */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-10' />
        <div className='bg-gradient-radial absolute inset-0 from-[#A90A0C]/5 via-transparent to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#0A192F]/50 to-[#0A192F]' />
      </div>

      <div className='relative z-10'>
        <Navbar isFixed={false} />

        <div className='mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8'>
          <div className='grid gap-12 lg:grid-cols-2 lg:gap-24'>
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='max-w-2xl'
            >
              {/* Innovation Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='mb-8 inline-flex items-center gap-3 rounded-full border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent px-5 py-2'
              >
                <span className='text-sm font-medium text-white/80'>
                  First-in-Class • Hardware + Software • Global Access
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='mb-6 font-light text-5xl tracking-tight text-white lg:text-7xl'
              >
                <span className='text-white'>Pioneering</span>
                <br />
                <span className='text-[#A90A0C]'>CCM Diagnostics</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='mb-8 text-xl leading-relaxed text-white/80'
              >
                Introducing the first integrated diagnostic platform for CCM -
                combining portable genetic screening devices with AI-powered
                imaging analysis to revolutionize early detection and
                monitoring.
              </motion.p>

              {/* Key Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='mt-12 grid grid-cols-3 gap-8'
              >
                <div className='relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent' />
                  <p className='relative text-3xl font-semibold text-white'>
                    60<span className='text-lg font-normal'>min</span>
                  </p>
                  <p className='relative mt-2 text-sm text-white/60'>
                    Rapid Results
                  </p>
                </div>
                <div className='relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent' />
                  <p className='relative text-3xl font-semibold text-white'>
                    95<span className='text-lg font-normal'>%</span>
                  </p>
                  <p className='relative mt-2 text-sm text-white/60'>
                    Detection Rate
                  </p>
                </div>
                <div className='relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-sm'>
                  <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent' />
                  <p className='relative text-3xl font-semibold text-white'>
                    90<span className='text-lg font-normal'>%</span>
                  </p>
                  <p className='relative mt-2 text-sm text-white/60'>
                    Cost Savings
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Product Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='relative hidden lg:block'
            >
              <div className='absolute -right-20 top-0 h-[600px] w-[600px] rounded-full bg-[#A90A0C]/5 blur-[120px]' />
              <div className='aspect-square relative rounded-2xl border border-white/5 bg-white/[0.02] p-8'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/10 via-transparent to-transparent' />
                <div className='grid h-full grid-cols-2 gap-4'>
                  <div className='rounded-xl border border-white/5 bg-white/[0.02] p-6'>
                    <h3 className='text-lg font-semibold text-white'>
                      Hardware
                    </h3>
                    <ul className='mt-4 space-y-3 text-sm text-white/60'>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        Portable PCR Device
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        Point-of-Care Testing
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        Battery Powered
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        Results in 60min
                      </li>
                    </ul>
                  </div>
                  <div className='rounded-xl border border-white/5 bg-white/[0.02] p-6'>
                    <h3 className='text-lg font-semibold text-white'>
                      Software
                    </h3>
                    <ul className='mt-4 space-y-3 text-sm text-white/60'>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        AI Image Analysis
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        Cloud Integration
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        Real-time Results
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                        Remote Monitoring
                      </li>
                    </ul>
                  </div>
                </div>
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
              <span className='text-sm text-white/60'>
                Explore Our Platform
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className='h-12 w-px bg-gradient-to-b from-[#A90A0C]/50 to-transparent'
              />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
