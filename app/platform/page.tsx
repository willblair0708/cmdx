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

  // Optimize intersection observer for product sections
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
        const productName = sectionId.split('-')[0];
        setCurrentProduct(
          productName.charAt(0).toUpperCase() + productName.slice(1)
        );
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    const sections = document.querySelectorAll(
      '[id$="-section"]:not(#product-section-0)'
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
          className='min-h-screen w-screen bg-gradient-to-b from-gray-950 to-blue-950/90 font-sans'
        >
          <AnimatePresence>
            {showNavbar && (
              <motion.div
                className='fixed top-0 z-50 w-full'
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3 }}
              >
                <ProductNavbar currentProduct={currentProduct} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.main
            ref={containerRef}
            initial='hidden'
            animate='visible'
            variants={containerVariants}
            className='relative'
          >
            <HeroSection
              id='product-section-0'
              bgColor='#1019EC'
              onScrollToNext={() => {
                document
                  .getElementById('genetic-screening-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <ProductSectionWrapper
              onInView={() => setCurrentProduct('GeneticScreening')}
            >
              <GeneticScreeningSection
                id='genetic-screening-section'
                bgColor='#18181B'
              />
            </ProductSectionWrapper>

            <ProductSectionWrapper
              onInView={() => setCurrentProduct('DiagnosticAI')}
            >
              <DiagnosticAISection
                id='diagnostic-ai-section'
                bgColor='#18181B'
              />
            </ProductSectionWrapper>
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