import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

import Navbar from '../Navbar';

interface MissionSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
  inView: boolean;
}

export default function MissionSection({
  id,
  bgColor,
  isMobile,
  inView: parentInView,
}: MissionSectionProps) {
  const [ref, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial='hidden'
      animate={parentInView && sectionInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='relative min-h-screen overflow-hidden bg-[#0A192F]'
    >
      <div className='absolute inset-0'>
        {/* Dynamic Background */}
        <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.03]' />
        <div className='absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-[#A90A0C]/5 blur-[120px]' />
        <div className='absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-[#112240]/20 blur-[120px]' />
      </div>

      <div className='mx-auto max-w-7xl px-4 py-36 sm:px-6 lg:px-8'>
        <div className='grid gap-16 lg:grid-cols-2 lg:gap-24'>
          {/* Left Column - Story */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col justify-center space-y-12'
          >
            <div className='space-y-10'>
              <div className='relative space-y-4'>
                <motion.span className='inline-block rounded-full border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent px-4 py-1.5 text-xs font-medium tracking-widest text-white/80'>
                  OUR TEAM
                </motion.span>
                <h2
                  className={`font-light ${isMobile ? 'text-3xl' : 'text-5xl lg:text-7xl'} tracking-tight text-white`}
                >
                  Multidisciplinary
                  <br />
                  <span className='bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>
                    Expertise
                  </span>
                </h2>
              </div>
              <div
                className={`space-y-8 text-white/70 ${isMobile ? 'text-lg' : 'text-xl'}`}
              >
                <p className='leading-relaxed'>
                  Our team and advisors bring together world-class expertise
                  across biochemistry, neurology, pre-clinical, and clinical development 
                  to address the most pressing diagnostic challenges facing patients and providers.
                </p>
                <div className='grid gap-6 sm:grid-cols-2'>
                  {/* Expertise Cards */}
                  {expertiseData.map((expertise, index) => (
                    <motion.div
                      key={expertise.title}
                      variants={cardVariants}
                      custom={index}
                      className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'
                    >
                      <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                      <div className='mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#A90A0C]/10'>
                        {expertise.icon}
                      </div>
                      <h3 className='mb-3 text-lg font-semibold text-white'>
                        {expertise.title}
                      </h3>
                      <p className='text-sm leading-relaxed text-white/60'>
                        {expertise.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div variants={itemVariants} className='relative lg:h-[800px]'>
            <div className='sticky top-8 h-full w-full'>
              <motion.div
                className='relative h-full overflow-hidden rounded-3xl'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className='absolute inset-0 bg-gradient-to-tr from-[#A90A0C]/40 via-[#A90A0C]/20 to-transparent mix-blend-overlay' />
                <motion.div
                  className='bg-gradient-radial absolute inset-0 from-[#A90A0C]/30 via-transparent to-transparent'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
                <Image
                  src='/assets/about/microscope.webp'
                  alt='Microscope visualization'
                  fill
                  className='object-cover transition-transform duration-700 hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  quality={90}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Icon Components (SVG)
const BiochemIcon = () => (
  <svg
    className='h-5 w-5 text-[#A90A0C]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
    />
  </svg>
);

const AIIcon = () => (
  <svg
    className='h-5 w-5 text-[#A90A0C]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    />
  </svg>
);

const SurgeryIcon = () => (
  <svg
    className='h-5 w-5 text-[#A90A0C]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    />
  </svg>
);

const DrugDevIcon = () => (
  <svg
    className='h-5 w-5 text-[#A90A0C]'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
    />
  </svg>
);

const expertiseData = [
  {
    title: 'Biochemistry',
    description:
      'Deep understanding of disease pathogenesis and molecular mechanisms',
    icon: <BiochemIcon />,
  },
  {
    title: 'AI/ML',
    description: 'Advanced image segmentation and predictive modeling expertise',
    icon: <AIIcon />,
  },
  {
    title: 'Neurology',
    description: 'Comprehensive experience in disease treatment and patient care',
    icon: <SurgeryIcon />,
  },
  {
    title: 'Biotechnology',
    description: 'Expertise in research & development and clinical trials',
    icon: <DrugDevIcon />,
  },
];

// Network Visualization Component
function NetworkVisualization() {
  return (
    <div className='relative h-full'>
      {/* Add your network visualization here - could be implemented with D3.js or a similar library */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className='relative h-[400px] w-[400px]'
        >
          {/* Add animated network nodes and connections here */}
          {/* This is a placeholder for the actual network visualization */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='h-32 w-32 rounded-full bg-[#A90A0C]/20 blur-xl' />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: 'beforeChildren',
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
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
