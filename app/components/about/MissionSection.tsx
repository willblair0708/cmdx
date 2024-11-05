import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

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

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial='hidden'
      animate={parentInView && sectionInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-50 ${
        isMobile ? 'px-4 py-12' : 'px-8 py-24 lg:px-24'
      }`}
    >
      <div className='mx-auto max-w-7xl'>
        <div className='grid gap-16 lg:grid-cols-2 lg:gap-24'>
          {/* Left Column - Story */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col justify-center space-y-12'
          >
            <div className='space-y-10'>
              <div className='relative space-y-4'>
                <motion.span
                  className='inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium tracking-widest text-gray-500'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  OUR STORY
                </motion.span>
                <h2
                  className={`font-book ${
                    isMobile ? 'text-3xl' : 'text-5xl lg:text-7xl'
                  } tracking-tight text-gray-900`}
                >
                  A Legacy of{' '}
                  <span className='relative'>
                    <span className='bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent'>
                      Hospitality
                    </span>
                    <motion.span
                      className='absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-gray-900 to-gray-500'
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </span>
                </h2>
              </div>
              <div
                className={`space-y-8 text-gray-600 ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}
              >
                <blockquote className='relative border-l-2 border-gray-200 pl-6 italic'>
                  <div className='absolute -left-2.5 top-0 h-4 w-4 rounded-full bg-gray-100 shadow-sm' />
                  <div className='absolute -left-2.5 bottom-0 h-4 w-4 rounded-full bg-gray-100 shadow-sm' />
                  &ldquo;I remember watching my parents greet guests at Yosemite
                  View Lodge like they were welcoming old friends into their
                  home. That warmth, that personal touch – it&apos;s something
                  technology alone can never replicate.&rdquo;
                </blockquote>
                <p className='leading-relaxed'>
                  Growing up in the family business, every summer was a new
                  lesson in hospitality. From helping at the front desk to
                  listening to guest stories over breakfast, I learned that true
                  service comes from genuine human connection.
                </p>
                <p className='leading-relaxed'>
                  After a decade in the startup world, I realized we could
                  enhance these personal moments, not replace them. That&apos;s
                  why we built GuestOS – to give hoteliers the tools to focus on
                  what matters most: creating memorable experiences for their
                  guests.
                </p>
              </div>
            </div>
            <div className='flex items-center justify-between border-t border-gray-100 pt-8'>
              <div className='flex items-center space-x-4'>
                <div className='h-px w-12 bg-gradient-to-r from-gray-300 to-transparent'></div>
                <span className='text-sm font-book text-gray-400'>
                  Est. 1976
                </span>
              </div>
              <motion.button
                className='group flex items-center space-x-3 rounded-full bg-gray-50 px-6 py-3 transition-all hover:bg-gray-100'
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className='text-sm font-medium text-gray-900'>
                  Our Journey
                </span>
                <motion.svg
                  className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M5 12H19M19 12L12 5M19 12L12 19'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div variants={itemVariants} className='relative lg:h-[800px]'>
            <div className='sticky top-8 h-full w-full'>
              <div className='hover:shadow-3xl group relative h-full w-full overflow-hidden rounded-3xl bg-gray-100 shadow-2xl transition-all duration-500'>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-gray-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                />
                <Image
                  src='/assets/about/story.png'
                  alt='Yosemite View Lodge in the 1980s'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 text-white'>
                  <p className='font-light text-sm tracking-wide'>
                    Yosemite View Lodge, Summer of 1986
                  </p>
                </div>
                <div className='absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md'>
                  <span className='font-light text-xs tracking-wider text-white'>
                    Historical Photo
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
