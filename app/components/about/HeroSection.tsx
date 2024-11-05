import Image from 'next/image';
import { useRef } from 'react';

import { motion } from 'framer-motion';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const HERO_IMAGE_DIMENSIONS = {
  width: 1920,
  height: 1080,
  mobileWidth: 828,
  mobileHeight: 1792,
};

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative h-screen overflow-hidden text-white'
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src='/assets/about/about_header.webp'
          alt='About GuestOS'
          fill
          quality={75}
          priority
          placeholder='blur'
          blurDataURL='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMzMzMiLz48L3N2Zz4='
          sizes={`(max-width: 768px) ${HERO_IMAGE_DIMENSIONS.mobileWidth}px, ${HERO_IMAGE_DIMENSIONS.width}px`}
          style={{
            objectFit: 'cover',
          }}
          loading='eager'
        />
      </motion.div>
      <div className='absolute inset-0 bg-black bg-opacity-30' />
      <Navbar isFixed={false} />
      <div className='absolute inset-0 flex items-start px-4 pt-[300px] text-white sm:items-center sm:px-4 sm:pt-0 md:px-8'>
        <motion.h1
          variants={itemVariants}
          initial='initial'
          animate='animate'
          className='max-w-4xl text-left text-hero font-book'
        >
          A Long-Standing Family Affair.
        </motion.h1>
      </div>
    </motion.section>
  );
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
