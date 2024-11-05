import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { motion } from 'framer-motion';

import LinkedIn from '@/public/assets/ui/LinkedIn';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface FounderSectionProps {
  id: string;
  isMobile: boolean;
}

export default function FounderSection({ id, isMobile }: FounderSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative overflow-hidden bg-white py-32'
      variants={containerVariants}
      initial='initial'
      whileInView='animate'
      viewport={{ once: true }}
    >
      {/* Modern gradient background */}
      <div className='absolute inset-0 bg-gradient-to-br from-neutral-50/80 via-white to-[#03E87A]/5' />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div variants={itemVariants} className='mb-24 text-center'>
          <span className='inline-flex items-center rounded-full bg-[#03E87A]/10 px-3 py-1 text-xs font-medium text-[#03E87A]'>
            FOUNDER'S STORY
          </span>
          <h2 className='mx-auto mt-6 max-w-3xl text-4xl font-book tracking-tight text-gray-900 lg:text-5xl'>
            From Yosemite to AI: Reimagining Hospitality
          </h2>
        </motion.div>

        <div className='relative grid gap-20 lg:grid-cols-12'>
          {/* Left column - Image */}
          <motion.div
            variants={itemVariants}
            className='relative z-10 lg:col-span-5'
          >
            <div className='sticky top-8'>
              <div className='relative aspect-[4/5] overflow-hidden rounded-2xl'>
                <Image
                  src='/assets/about/jessie.jpg'
                  alt='Jessie Fischer, Founder & CEO of GuestOS'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 40vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />

                {/* Modern card overlay */}
                <motion.div
                  className='absolute bottom-6 left-6 right-6'
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className='overflow-hidden rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-md'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h3 className='text-lg font-medium text-gray-900'>
                          Jessie Fischer
                        </h3>
                        <p className='text-sm text-gray-600'>Founder & CEO</p>
                      </div>
                      <div className='flex gap-3'>
                        <Link
                          href='https://www.linkedin.com/in/jessiefischer/'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200'
                        >
                          <LinkedIn width={16} height={16} />
                        </Link>
                        <Link
                          href='https://www.peakconversations.com/'
                          target='_blank'
                          rel='noopener noreferrer'
                          className='rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200'
                        >
                          <svg
                            className='h-4 w-4'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                          >
                            <path d='M12 3.5l2.5 5 5.5.8-4 3.9 1 5.4-5-2.6-5 2.6 1-5.4-4-3.9 5.5-.8z' />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            variants={itemVariants}
            className='relative z-10 lg:col-span-7'
          >
            <div className='sticky top-8 space-y-12'>
              <div className='space-y-8 text-lg leading-relaxed text-gray-600'>
                <p className='text-xl font-medium text-gray-900'>
                  As a third-generation hotelier and tech entrepreneur, I've
                  witnessed firsthand how genuine hospitality transforms stays
                  into unforgettable experiences.
                </p>
                <blockquote className='relative border-l-2 border-[#03E87A] pl-8 italic text-gray-500'>
                  <div className='absolute -left-1 -top-1 h-3 w-3 rounded-full bg-[#03E87A]' />
                  "Technology should amplify the warmth of human hospitality,
                  not replace it. That's the foundation of everything we build
                  at GuestOS."
                </blockquote>
                <p>
                  My journey from managing our family's Yosemite properties to
                  founding GuestOS has been guided by a single vision: enhancing
                  human connection through thoughtful innovation.
                </p>
              </div>

              {/* Achievements */}
              <div className='grid gap-8 border-t border-gray-100 pt-12 sm:grid-cols-2'>
                <Link
                  href='https://www.phocuswire.com/Phocuswright-selects-winners-philip-wolf-scholarship'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <span className='text-sm font-medium text-[#03E87A]'>
                    Recognition
                  </span>
                  <p className='mt-2 font-medium text-gray-900'>
                    Phocuswright Scholar
                    <span className='ml-2 inline-block transition-transform group-hover:translate-x-1'>
                      →
                    </span>
                  </p>
                </Link>
                <Link
                  href='https://www.peakconversations.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group'
                >
                  <span className='text-sm font-medium text-[#03E87A]'>
                    Latest Project
                  </span>
                  <p className='mt-2 font-medium text-gray-900'>
                    Peak Conversations
                    <span className='ml-2 inline-block transition-transform group-hover:translate-x-1'>
                      →
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
