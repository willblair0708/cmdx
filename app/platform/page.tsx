'use client';

import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useIsMobile from '@/hooks/use-is-mobile';

import Footer from '../components/Footer';

const DiagnosticAISection = dynamic(
  () => import('../components/platform/DiagnosticAISection'),
  { ssr: false }
);

const HeroSection = dynamic(
  () => import('../components/platform/HeroSection'),
  { ssr: false }
);

const GeneticScreeningSection = dynamic(
  () => import('../components/platform/GeneticScreeningSection'),
  { ssr: false }
);

const ProductNavbar = dynamic(
  () => import('../components/platform/ProductNavbar'),
  { ssr: false }
);

export default function ProductsPage() {
  const [currentProduct, setCurrentProduct] = useState('');
  const [showNavbar, setShowNavbar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      threshold: [0.3],
      rootMargin: '-20% 0px',
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.reduce((prev, current) => {
        return current.intersectionRatio > prev.intersectionRatio
          ? current
          : prev;
      });

      if (visibleEntry.intersectionRatio >= 0.3) {
        const sectionId = visibleEntry.target.id;
        const productMap: { [key: string]: string } = {
          'genetic-screening-section': 'Genetic Screening',
          'diagnostic-ai-section': 'AI Diagnostics',
        };
        setCurrentProduct(productMap[sectionId] || '');
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const sections = document.querySelectorAll(
      '#genetic-screening-section, #diagnostic-ai-section'
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Optimize sticky nav detection
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('product-section-0');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setShowNavbar(heroRect.bottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          key='products-page'
          className='relative min-h-screen w-screen bg-[#0A192F]'
        >
          {/* Background Elements */}
          <div className='fixed inset-0'>
            <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.03]' />
            <div className='absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F]' />
            <div className='bg-gradient-radial absolute inset-0 from-[#A90A0C]/5 via-transparent to-transparent' />

            {/* Ambient Light Effects */}
            <div className='absolute left-0 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#A90A0C]/5 blur-[120px]' />
            <div className='absolute right-0 top-1/2 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-[#112240]/30 blur-[120px]' />
          </div>

          <AnimatePresence>
            {showNavbar && (
              <motion.div
                className='fixed top-0 z-50 w-full'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductNavbar currentProduct={currentProduct} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.main className='relative'>
            <HeroSection
              id='hero-section'
              bgColor='#0A192F'
              onScrollToNext={() =>
                containerRef.current?.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth',
                })
              }
            />

            {/* <section className='relative min-h-screen'>
              <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className='mb-16 font-light text-3xl tracking-tight text-white sm:text-4xl'
                >
                  Our Platform
                </motion.h2>
                <div className='grid gap-8 lg:grid-cols-2'>
                  <ProductSectionWrapper
                    onInView={() => setCurrentProduct('Genetic Screening')}
                  >
                    <GeneticScreeningSection
                      id='genetic-screening-section'
                      bgColor='#0A192F'
                    />
                  </ProductSectionWrapper>
                  <ProductSectionWrapper
                    onInView={() => setCurrentProduct('AI Diagnostics')}
                  >
                    <DiagnosticAISection
                      id='diagnostic-ai-section'
                      bgColor='#0A192F'
                    />
                  </ProductSectionWrapper>
                </div>
              </div>
            </section> */}
          </motion.main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}

interface ProductSectionWrapperProps {
  children: React.ReactNode;
  onInView: () => void;
}

function ProductSectionWrapper({
  children,
  onInView,
}: ProductSectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ref = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) onInView();
      },
      { threshold: 0.5 }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
const containerVariants = {
  // hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
};
