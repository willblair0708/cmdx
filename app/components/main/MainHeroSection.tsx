'use client';

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

// Constants
const PARTICLE_COUNT = 50;
const SPRING_CONFIG = { stiffness: 100, damping: 30, restDelta: 0.001 };

const Background = () => (
  <motion.div className="absolute inset-0 z-0">
    <div className="absolute inset-0">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F]" />

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
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(169,10,12,0.05) 0%, transparent 50%)',
        }}
      />

      {/* Synaptic Connections */}
      <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-[0.03]" />

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
        className="absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-[#A90A0C]/10 blur-[120px]"
      />
    </div>
  </motion.div>
);

interface MainHeroSectionProps {
  id: string;
  isMobile?: boolean;
}

export default function MainHeroSection({ id, isMobile }: MainHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '15%']);
  const ySpring = useSpring(y, SPRING_CONFIG);

  // Render particles only on the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className="relative min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Background />

      <motion.div
        className="relative z-20 flex h-full flex-col"
        style={{ opacity, scale, y: ySpring }}
      >
        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-20 lg:pt-0">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative mb-4 sm:mb-6"
            >
              <h1 className="font-light text-3xl leading-[1.2] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Deep-Tech Diagnostics for
                <br />
                <span className="relative mt-2 inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#808080] to-[#A8A8A8] bg-clip-text text-transparent">
                    Neurology Rare Disease
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#A90A0C] to-transparent"
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 max-w-2xl text-base leading-relaxed text-white/70 sm:mb-12 sm:text-lg"
            >
              Pioneering accessible genetic testing for inherited forms of seizure,
              vascular malformations, and other neurological diseases, bridging advanced
              molecular diagnostics to patients worldwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <Link
                href="#platform"
                className="group relative overflow-hidden rounded-xl bg-[#A90A0C] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#A90A0C]/20"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#A90A0C]/0 via-[#A90A0C]/50 to-[#A90A0C]/0"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <span className="relative flex items-center gap-2">
                  Our Platform
                  <motion.svg
                    className="h-4 w-4"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M1 8h14M9 2l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Render particle effects only on the client */}
      {mounted && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          {/* White particles */}
          {[...Array(PARTICLE_COUNT)].map((_, i) => (
            <motion.div
              key={`white-${i}`}
              className="absolute h-1 w-1 rounded-full bg-white"
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

          {/* Additional red particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`red-${i}`}
              className="absolute h-1 w-1 rounded-full bg-red-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.5,
                scale: Math.random() * 0.7 + 0.3,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.5, 0.7, 0.5],
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
      )}
    </motion.section>
  );
}

