import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';
import { Dna } from 'lucide-react';

import useIsMobile from '@/hooks/use-is-mobile';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  onScrollToNext: () => void;
}

const GeneticIcon = () => (
  <svg
    className='h-6 w-6 text-[#A90A0C]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    />
  </svg>
);

const AIIcon = () => (
  <svg
    className='h-6 w-6 text-[#A90A0C]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    />
  </svg>
);

const Background = () => (
  <motion.div className='absolute inset-0 z-0'>
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
          background:
            'radial-gradient(circle at 50% 50%, rgba(169,10,12,0.05) 0%, transparent 50%)',
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
  </motion.div>
);

export default function HeroSection({
  id,
  bgColor,
  onScrollToNext,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Background />

      <motion.div className='relative z-20'>
        <Navbar isFixed={false} />

        {/* Hero Content */}
        <div className='mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8'>
          {/* Hero Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-3xl'
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
              Introducing the first integrated diagnostic platform for CCM which
              combines portable genetic screening devices with our AI-powered
              imaging analysis to revolutionize early detection and monitoring.
            </motion.p>
          </motion.div>

          {/* Product Sections */}
          <div className='mt-32 space-y-24'>
            {/* Genetic Screening Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm'
            >
              <div className='grid gap-12 lg:grid-cols-2'>
                {/* Left Content */}
                <div className='relative space-y-6'>
                  <div className='flex items-center gap-4'>
                    <div className='rounded-lg bg-[#A90A0C]/10 p-3'>
                      <Dna className='h-6 w-6 text-[#A90A0C]' />
                    </div>
                    <h3 className='text-xl font-semibold text-white'>
                      Genetic Screening
                    </h3>
                  </div>

                  <p className='text-white/70'>
                    Portable PCR device for rapid genetic testing, enabling
                    point-of-care diagnostics in resource-limited settings.
                  </p>

                  <ul className='space-y-3 text-sm text-white/60'>
                    <li className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                      Rapid Results
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                      Low cost
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                      Point-of-care testing
                    </li>
                  </ul>
                </div>

                {/* Right Image */}
                <div className='lg:aspect-auto relative aspect-[16/9] overflow-hidden rounded-xl'>
                  <Image
                    src='/assets/platform/genetic-assay.png'
                    alt='Genetic Screening Device'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60' />
                </div>
              </div>
            </motion.div>

            {/* AI Diagnostics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className='group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm'
            >
              <div className='grid gap-12 lg:grid-cols-2'>
                {/* Left Content */}
                <div className='relative space-y-6'>
                  <div className='flex items-center gap-4'>
                    <div className='rounded-lg bg-[#A90A0C]/10 p-3'>
                      <AIIcon />
                    </div>
                    <h3 className='text-xl font-semibold text-white'>
                      AI Diagnostics
                    </h3>
                  </div>

                  <p className='text-white/70'>
                    Advanced imaging analysis powered by machine learning for
                    accurate CCM detection and monitoring.
                  </p>

                  <ul className='space-y-3 text-sm text-white/60'>
                    <li className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                      Real-time analysis
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                      Cloud integration
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='h-1 w-1 rounded-full bg-[#A90A0C]' />
                      Remote monitoring
                    </li>
                  </ul>
                </div>

                {/* Right Image */}
                <div className='lg:aspect-auto relative aspect-[16/9] overflow-hidden rounded-xl'>
                  <Image
                    src='/assets/platform/ai-diagnostics.png'
                    alt='AI Diagnostics Platform'
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60' />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Added bottom spacing */}
          <div className='pb-32' />
        </div>
      </motion.div>
    </motion.section>
  );
}
