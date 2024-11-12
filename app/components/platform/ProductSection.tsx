import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

interface ProductSectionProps {
  id: string;
  bgColor: string;
  productName: string;
  productDescription: string;
  imageSrc: string;
}

export default function ProductSection({
  id,
  bgColor,
  productName,
  productDescription,
  imageSrc,
}: ProductSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      className='relative h-full'
      ref={ref}
    >
      <div className='group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-[#0A192F] transition-all duration-500 hover:border-white/10'>
        {/* Background Elements */}
        <div className='absolute inset-0'>
          {/* Grid Pattern */}
          <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.03]' />

          {/* Gradient Overlays */}
          <div className='absolute inset-0 bg-gradient-to-br from-[#112240] via-[#0A192F] to-[#0A192F]' />
          <div className='bg-gradient-radial absolute inset-0 from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

          {/* Additional Ambient Effects */}
          <div className='absolute -left-1/2 top-0 h-[500px] w-[500px] rounded-full bg-[#A90A0C]/5 blur-[120px] transition-opacity duration-500 group-hover:opacity-70' />
          <div className='absolute -right-1/2 bottom-0 h-[500px] w-[500px] rounded-full bg-[#112240]/30 blur-[120px] transition-opacity duration-500 group-hover:opacity-70' />
        </div>

        {/* Content Container */}
        <div className='relative z-10 flex h-full flex-col p-8'>
          {/* Product Badge */}
          <motion.div variants={itemVariants} className='mb-4'>
            <div className='inline-flex items-center gap-2 rounded-full border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent px-4 py-1.5 shadow-lg shadow-black/5 backdrop-blur-sm'>
              <div className='h-1.5 w-1.5 rounded-full bg-[#A90A0C]/40' />
              <span className='text-xs font-medium uppercase tracking-wider text-white/70'>
                {productName === 'Genetic Screening'
                  ? 'Hardware + Software'
                  : 'Cloud Platform'}
              </span>
            </div>
          </motion.div>

          {/* Image Container */}
          <motion.div
            variants={itemVariants}
            className='relative mb-6 aspect-[16/9] overflow-hidden rounded-xl'
          >
            <div className='absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#A90A0C]/20 blur-[100px]' />
            <Image
              src={imageSrc}
              alt={`${productName} Visualization`}
              fill
              className='object-cover transition-transform duration-700 group-hover:scale-105'
              quality={95}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/50 to-transparent opacity-80' />
          </motion.div>

          {/* Text Content */}
          <motion.div variants={itemVariants} className='mt-auto'>
            <h2 className='font-light text-2xl tracking-wide text-white'>
              {productName}
            </h2>
            <p className='mt-4 text-base leading-relaxed text-white/70'>
              {productDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
