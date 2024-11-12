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
      className='relative min-h-screen overflow-hidden bg-[#0A192F]'
    >
      <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'>
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
                  across biochemistry, ML/AI, vascular neurosurgery, and drug
                  development to tackle CCM's most pressing challenges.
                </p>
                <div className='grid gap-6 sm:grid-cols-2'>
                  {/* Expertise Cards */}
                  <div className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                    <h3 className='mb-3 text-lg font-semibold text-white'>
                      Biochemistry
                    </h3>
                    <p className='text-sm leading-relaxed text-white/60'>
                      Deep understanding of CCM pathogenesis and molecular
                      mechanisms
                    </p>
                  </div>
                  <div className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                    <h3 className='mb-3 text-lg font-semibold text-white'>
                      ML/AI
                    </h3>
                    <p className='text-sm leading-relaxed text-white/60'>
                      Advanced imaging analysis and predictive modeling
                      expertise
                    </p>
                  </div>
                  <div className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                    <h3 className='mb-3 text-lg font-semibold text-white'>
                      Vascular Neurosurgery
                    </h3>
                    <p className='text-sm leading-relaxed text-white/60'>
                      Clinical expertise in CCM treatment and patient care
                    </p>
                  </div>
                  <div className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm'>
                    <div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                    <h3 className='mb-3 text-lg font-semibold text-white'>
                      Drug Development
                    </h3>
                    <p className='text-sm leading-relaxed text-white/60'>
                      Experience in therapeutic development and clinical trials
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Team Image */}
          <motion.div variants={itemVariants} className='relative lg:h-[800px]'>
            <div className='sticky top-8 h-full w-full'>
              <div className='hover:shadow-3xl group relative h-full w-full overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl transition-all duration-500'>
                <motion.div className='absolute inset-0 bg-gradient-to-br from-[#A90A0C]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                <Image
                  src='/assets/about/team.webp'
                  alt='Our Team'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/50 to-transparent opacity-80' />
                <div className='absolute bottom-0 left-0 right-0 p-8'>
                  <p className='font-light text-sm tracking-wide text-white/80'>
                    Our multidisciplinary team combines expertise from various
                    fields to drive innovation in CCM diagnostics
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
