import Link from 'next/link';
import { useCallback, useMemo } from 'react';
import { memo } from 'react';

import { motion } from 'framer-motion';

interface ProductNavbarProps {
  currentProduct: string;
}

const products = ['Genetic Screening', 'AI Diagnostics'];

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
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
          const navHeight = 90;
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
          className={`flex items-center transition-colors hover:text-white ${
            isActive ? 'text-white' : 'text-white/60'
          }`}
          onClick={handleClick}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className='flex items-center'>
            <motion.span
              className={`mr-2 h-1.5 w-1.5 rounded-full bg-blue-400 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: isActive ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
            {product}
          </span>
        </Link>
        <motion.div
          className='absolute -bottom-1 left-0 right-0 h-px origin-left bg-blue-400/50'
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
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='sticky top-0 z-50 w-full bg-gray-950/80 backdrop-blur-md'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-24 items-center justify-between border-b border-blue-500/10'>
          <motion.p
            variants={navItemVariants}
            className='text-sm font-medium text-blue-200/60'
          >
            Our Solutions
          </motion.p>

          <div className='flex space-x-8 text-sm font-medium'>
            {products.map((product) => (
              <ProductLink
                key={product}
                product={product}
                currentProduct={currentProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default memo(ProductNavbar);
