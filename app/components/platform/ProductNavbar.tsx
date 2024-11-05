import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { memo } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

interface ProductNavbarProps {
  currentProduct: string;
}

const products = ['Genetic Screening', 'AI Diagnostics'];

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const ProductLink = memo(
  ({
    product,
    currentProduct,
    onClick,
  }: {
    product: string;
    currentProduct: string;
    onClick?: () => void;
  }) => {
    const isActive = useMemo(
      () => currentProduct === product,
      [currentProduct, product]
    );

    const sectionId = useMemo(() => {
      const idMap: { [key: string]: string } = {
        'Genetic Screening': 'genetic-screening',
        'AI Diagnostics': 'diagnostic-ai',
      };
      return idMap[product] || product.toLowerCase().replace(' ', '-');
    }, [product]);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        const section = document.getElementById(`${sectionId}-section`);
        if (section) {
          const navHeight = 96; // Increased for better spacing
          const sectionTop = section.offsetTop - navHeight;
          window.scrollTo({
            top: sectionTop,
            behavior: 'smooth',
          });
        }
        if (onClick) onClick();
      },
      [sectionId, onClick]
    );

    return (
      <motion.div
        variants={navItemVariants}
        className='group relative'
        initial='hidden'
        animate='visible'
      >
        <Link
          href={`#${sectionId}-section`}
          className={`relative flex items-center px-4 py-2 transition-all duration-200 hover:text-white ${
            isActive ? 'text-white' : 'text-white/60'
          }`}
          onClick={handleClick}
          aria-current={isActive ? 'page' : undefined}
        >
          {/* Hover/Active Background */}
          <motion.div
            className='absolute inset-0 rounded-full bg-blue-500/5 opacity-0 transition-opacity duration-200'
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
            }}
          />

          {/* Content */}
          <span className='relative flex items-center gap-3'>
            <motion.span
              className={`flex h-2 w-2 items-center justify-center`}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.5,
                opacity: isActive ? 1 : 0,
              }}
            >
              <span className='absolute h-1.5 w-1.5 rounded-full bg-blue-400' />
              <span className='w-fullrounded-full absolute h-full bg-blue-400/30' />
            </motion.span>
            <span className='relative'>{product}</span>
          </span>
        </Link>

        {/* Hover line effect */}
        <motion.div
          className='absolute -bottom-1 left-4 right-4 h-px origin-left bg-blue-400/30'
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    );
  }
);

ProductLink.displayName = 'ProductLink';

function ProductNavbar({ currentProduct }: ProductNavbarProps) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(3, 7, 18, 0.5)', 'rgba(3, 7, 18, 0.95)']
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0.05, 0.1]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ backgroundColor }}
      className='sticky top-0 z-50 backdrop-blur-md'
    >
      <motion.div
        style={{ borderColor: `rgba(59, 130, 246, ${borderOpacity.get()})` }}
        className='mx-auto max-w-7xl border-b px-4 sm:px-6 lg:px-8'
      >
        <div className='flex h-24 items-center justify-between'>
          <motion.p
            variants={navItemVariants}
            className='text-sm font-medium text-blue-200/60'
          >
            Our Solutions
          </motion.p>

          <div className='flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 p-1.5 backdrop-blur-sm'>
            {products.map((product) => (
              <ProductLink
                key={product}
                product={product}
                currentProduct={currentProduct}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default memo(ProductNavbar);
