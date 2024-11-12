import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import Navbar from '../Navbar';

// Constants
const PARTICLE_COUNT = 35;
const SPRING_CONFIG = { stiffness: 120, damping: 25, restDelta: 0.001 };

const Background = () => (
  <motion.div className='absolute inset-0 z-0'>
    <div className='absolute inset-0'>
      {/* Base Gradient */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F]' />

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className='absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-[#A90A0C]/10 blur-[120px]'
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className='absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-[#112240]/30 blur-[120px]'
      />

      {/* Grid Pattern */}
      <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.03]' />

      {/* Radial Gradients */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(169,10,12,0.12),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(17,34,64,0.08),transparent_70%)]' />
    </div>
  </motion.div>
);

interface HeroSectionProps {
  id: string;
  isMobile?: boolean;
}

export default function HeroSection({ id, isMobile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const ySpring = useSpring(y, SPRING_CONFIG);

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

      <motion.div
        className='relative z-20 flex h-full flex-col'
        style={{ opacity, scale, y: ySpring }}
      >
        <Navbar isFixed={false} />

        <div className='relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='mb-8 inline-flex items-center gap-3 rounded-full border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent px-5 py-2 backdrop-blur-sm'
            >
              <div className='h-1.5 w-1.5 animate-pulse rounded-full bg-[#A90A0C]' />
              <span className='text-sm font-medium text-white/80'>
                Genetic Screening • AI Diagnostics • Preventative Medicine
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className='mb-6 font-light text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl'
            >
              Deep-Tech Diagnostics for
              <br />
              <span className='text-[#808080]'>Neurological Disorders</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className='mb-12 max-w-2xl text-lg leading-relaxed text-white/70'
            >
              Pioneering accessible genetic screening and AI-powered imaging
              analysis for cerebral cavernous malformations, bringing advanced
              diagnostics to underserved communities worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className='flex flex-wrap gap-4'
            >
              <Link
                href='/platform'
                className='group relative overflow-hidden rounded-xl bg-[#A90A0C] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#A90A0C]/20'
              >
                <span className='relative flex items-center gap-2'>
                  Our Platform
                  <motion.svg
                    className='h-4 w-4'
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <path
                      d='M1 8h14M9 2l6 6-6 6'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </motion.svg>
                </span>
              </Link>
              <Link
                href='/research'
                className='group relative overflow-hidden rounded-md border border-[#A90A0C]/10 bg-white/[0.02] px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04]'
              >
                Clinical Research
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Particle Effect */}
      <motion.div
        className='pointer-events-none absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        {[...Array(PARTICLE_COUNT)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute h-1 w-1 rounded-full bg-white'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
