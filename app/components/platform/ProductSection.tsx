import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

interface ProductSectionProps {
  id: string;
  bgColor: string;
  productName: string;
  productDescription: string;
  imageSrc: string;
  features: Array<{
    title: string;
    description: string;
    bulletPoints?: string[];
  }>;
  metrics?: Array<{
    value: string;
    label: string;
    subtext: string;
  }>;
  certifications?: string[];
  integrations?: string[];
}

const PRODUCT_DESCRIPTION =
  'Too many people make decisions based on no data, or worse, bad data. Meet a family of simulation engines, built by our researchers alongside our category-defining partners. Engineered to provide clairvoyance for those who need it most.';

export default function ProductSection({
  id,
  bgColor,
  productName,
  productDescription,
  imageSrc,
  features,
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
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ backgroundColor: bgColor }}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='relative min-h-screen py-24 text-white'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Product Header */}
        <motion.div variants={itemVariants} className='mb-16 max-w-3xl'>
          <h2 className='mb-6 font-light text-5xl tracking-tight lg:text-6xl'>
            {productName}
          </h2>
          <p className='text-xl text-blue-200/80 lg:text-2xl'>
            {productDescription}
          </p>
        </motion.div>

        <div className='grid gap-16 lg:grid-cols-2'>
          {/* Image Section */}
          <motion.div
            variants={itemVariants}
            className='relative aspect-[3/3] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent lg:sticky lg:top-24 lg:h-[600px]'
          >
            <Image
              src={imageSrc}
              alt={`${productName} Visualization`}
              fill
              className='object-cover'
              quality={90}
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent' />
          </motion.div>

          {/* Features Section */}
          <motion.div variants={itemVariants} className='space-y-16'>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='relative rounded-xl border border-blue-500/10 bg-gradient-to-br from-blue-500/5 via-blue-400/5 to-transparent p-8 backdrop-blur-sm'
              >
                <div className='mb-4 flex items-center gap-3'>
                  <div className='h-1.5 w-1.5 rounded-full bg-blue-400'></div>
                  <h3 className='text-sm font-semibold tracking-wider text-blue-300'>
                    {feature.title}
                  </h3>
                </div>
                <p className='mb-6 text-lg text-gray-300/90'>
                  {feature.description}
                </p>
                {feature.bulletPoints && (
                  <ul className='space-y-3'>
                    {feature.bulletPoints.map((point, i) => (
                      <li
                        key={i}
                        className='flex items-start gap-3 text-gray-300/70'
                      >
                        <span className='mt-1.5 h-1 w-1 rounded-full bg-blue-500/50'></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
