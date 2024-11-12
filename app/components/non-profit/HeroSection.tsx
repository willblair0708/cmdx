import { useRef } from 'react';

import { motion } from 'framer-motion';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

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
      className='relative min-h-screen overflow-hidden bg-[#0A192F]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Overlays */}
      <motion.div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.03]' />
        <div className='bg-gradient-radial absolute inset-0 from-[#A90A0C]/5 via-transparent to-transparent' />
      </motion.div>

      <Navbar isFixed={false} />

      <div className='relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8'>
        <div className='max-w-3xl'>
          {/* Mission Badge */}
          <motion.div
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mb-8 inline-flex items-center gap-3 rounded-full border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent px-5 py-2'
          >
            <div className='h-1.5 w-1.5 rounded-full bg-[#A90A0C]' />
            <span className='text-sm font-medium text-white/80'>
              Education • Research • Global Impact
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mb-8 font-light text-5xl tracking-tight text-white lg:text-7xl'
          >
            Empowering the Next Generation of CCM Care
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mb-12 max-w-2xl text-lg leading-relaxed text-white/70'
          >
            Bridging the gap in CCM education and research through innovative
            programs, global collaboration, and accessible medical training.
          </motion.p>

          {/* Initiative Cards */}
          <motion.div
            variants={containerVariants}
            initial='initial'
            animate='animate'
            className='grid gap-6 md:grid-cols-3'
          >
            {/* Medical Education Card */}
            <motion.div
              variants={itemVariants}
              className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-lg font-semibold text-white'>
                Rural Medical Training
              </h3>
              <p className='text-sm leading-relaxed text-white/60'>
                Supporting medical students in Mexico who will provide care in
                rural communities
              </p>
            </motion.div>

            {/* Podcast Education Card */}
            <motion.div
              variants={itemVariants}
              className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-lg font-semibold text-white'>
                Medical Education Podcast
              </h3>
              <p className='text-sm leading-relaxed text-white/60'>
                Featuring insights from patients and CCM experts worldwide
              </p>
            </motion.div>

            {/* Research Network Card */}
            <motion.div
              variants={itemVariants}
              className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              <h3 className='mb-3 text-lg font-semibold text-white'>
                Global Research Network
              </h3>
              <p className='text-sm leading-relaxed text-white/60'>
                Connecting research teams and sharing data to advance scientific
                understanding of CCM pathogenesis
              </p>
            </motion.div>
          </motion.div>
        </div>
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

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
