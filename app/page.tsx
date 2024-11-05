'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import Footer from './components/Footer';
import HeroSection from './components/main/HeroSection';

export default function Home() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };
  return (
    <div>
      {isMounted && (
        <>
          <AnimatePresence mode='wait'>
            <motion.div
              key='home-page'
              className='min-h-screen overflow-hidden font-sans'
            >
              <motion.main
                ref={containerRef}
                initial='visible'
                animate='visible'
                variants={containerVariants}
                className='relative'
              >
                <motion.div
                  variants={sectionVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
                  className='w-full'
                >
                  <HeroSection id='section-0' isMobile={isMobile} />
                </motion.div>
                <motion.div
                  variants={sectionVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
                  className='w-full'
                ></motion.div>
              </motion.main>
            </motion.div>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </div>
  );
}

const containerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
