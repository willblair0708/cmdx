import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import ArrowIcon from '@/public/assets/ui/Arrow';
import LinkedIn from '@/public/assets/ui/LinkedIn';

interface FutureSectionProps {
  id: string;
  bgColor: string;
}

export default function FutureSection({ id, bgColor }: FutureSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const router = useRouter();

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleSpring = useSpring(scale, springConfig);
  const opacitySpring = useSpring(opacity, springConfig);
  const ySpring = useSpring(y, springConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  const roles = ['Full Stack Engineer', 'Research Engineer'];

  const handleRoleClick = (role: string) => {
    router.push(
      `/careers/${encodeURIComponent(role.toLowerCase().replace(/ /g, '-'))}`
    );
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative min-h-screen overflow-hidden bg-[#0A0A0B] px-5 pb-0 text-white sm:px-8'
    >
      {/* Enhanced gradient overlays with more dynamic effects */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,232,122,0.15),transparent_70%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(3,232,122,0.08),transparent_70%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5))]' />
      <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.03] mix-blend-overlay' />
      
      <div className='container relative z-10 mx-auto mt-[120px] lg:mt-[160px]'>
        {/* Enhanced Hero Section */}
        <motion.div 
          variants={itemVariants} 
          className='mb-32 flex flex-col items-center'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className='relative mb-8 overflow-hidden rounded-full border border-white/5 bg-white/5 p-1 backdrop-blur-md'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center gap-2 px-4 py-1.5'>
              <span className='h-2 w-2 animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[#03E87A]' />
              <span className='text-xs font-medium tracking-wider'>WE'RE HIRING</span>
            </div>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]' />
          </motion.div>

          <h2 className='mx-auto mb-8 max-w-4xl text-center font-book text-5xl tracking-tight lg:text-7xl'>
            Join us in shaping the{' '}
            <span className='relative inline-block'>
              future
              <motion.div
                className='absolute -bottom-2 left-0 h-[2px] w-full bg-gradient-to-r from-[#03E87A] via-[#03E87A]/50 to-transparent'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>{' '}
            of hospitality
          </h2>
          <p className='mx-auto max-w-2xl text-center text-lg font-light leading-relaxed text-white/60'>
            Where cutting-edge AI technology meets genuine human connection to create unforgettable guest experiences.
          </p>
        </motion.div>

        {/* Enhanced Founder Card */}
        <motion.div
          variants={itemVariants}
          className='relative mx-auto mb-40 max-w-5xl'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className='group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 p-[1px]'>
            <div className='absolute inset-0 bg-gradient-to-r from-[#03E87A]/20 via-white/5 to-transparent blur-xl' />
            <div className='absolute inset-0 bg-[url("/assets/noise.png")] opacity-[0.03] mix-blend-overlay' />
            <div className='relative flex flex-col gap-8 rounded-[23px] bg-gradient-to-br from-gray-900/95 to-black p-8 backdrop-blur-xl lg:flex-row lg:items-center lg:p-12'>
              <motion.div 
                className='relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl lg:w-2/5'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src='/assets/about/about_header.webp'
                  alt='Jessie Fischer'
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 40vw'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />
                <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
              </motion.div>

              <div className='flex flex-1 flex-col justify-between gap-8 lg:py-8'>
                <div>
                  <div className='mb-6 flex items-center gap-4'>
                    <h3 className='text-2xl font-medium bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent'>Jessie Fischer</h3>
                    <div className='h-px flex-1 bg-gradient-to-r from-white/20 to-transparent' />
                  </div>
                  <p className='mb-8 text-white/60 tracking-wide'>
                    Founder & CEO
                  </p>
                  <blockquote className='text-xl font-light italic leading-relaxed text-white/80'>
                    "We're not just building another AI tool – we're crafting the future of hospitality experiences, where technology enhances rather than replaces human connection."
                  </blockquote>
                </div>
                
                <div className='flex items-center gap-6'>
                  <Link
                    href='https://www.linkedin.com/in/jessiefischer/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group rounded-full bg-white/5 p-3 transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-[#03E87A]/10'
                  >
                    <LinkedIn width={20} height={20} className='transition-transform group-hover:scale-110' />
                  </Link>
                  <div className='h-8 w-px bg-white/10' />
                  <Link
                    href='/careers'
                    className='group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white'
                  >
                    View Open Positions
                    <span className='inline-block transition-transform group-hover:translate-x-1'>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Roles Section
        <motion.div
          variants={containerVariants}
          className='mx-auto max-w-4xl'
        >
          <motion.div variants={itemVariants} className='mb-16 text-center'>
            <h2 className='text-3xl font-book bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent'>Current Opportunities</h2>
            <p className='mt-4 text-white/60'>
              {roles.length} positions available
            </p>
          </motion.div> */}
{/* 
          <motion.div variants={itemVariants} className='space-y-4'>
            {roles.map((role, index) => (
              <motion.div
                key={index}
                className='group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-[#03E87A]/20 hover:bg-white/10'
                onClick={() => handleRoleClick(role)}
                whileHover={{ y: -2, scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />
                <div className='relative flex items-center justify-between'>
                  <div>
                    <h3 className='text-xl font-medium'>{role}</h3>
                    <p className='mt-2 text-sm text-white/60'>Full Time • Remote • Competitive Package</p>
                  </div>
                  <div className='rounded-full border border-white/10 p-3 transition-all duration-300 group-hover:border-[#03E87A]/30 group-hover:bg-[#03E87A]/5'>
                    <ArrowIcon
                      color='white'
                      className='rotate-[-90deg] transition-transform duration-300 group-hover:translate-x-0.5'
                      opacity={0.6}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Enhanced Contact Section
          <motion.div
            variants={itemVariants}
            className='relative mt-32 mb-20 overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-12 text-center backdrop-blur-sm'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-[#03E87A]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            <h3 className='relative mb-4 text-2xl font-book'>Don't see your perfect role?</h3>
            <p className='relative mx-auto max-w-2xl text-white/60'>
              We're always looking for exceptional talent to join our team. Drop us a line at{' '}
              <Link
                href='mailto:jobs@aaru.com'
                className='relative inline-block text-white transition-all hover:text-[#03E87A] group'
              >
                jobs@aaru.com
                <motion.div
                  className='absolute -bottom-px left-0 h-px w-full bg-[#03E87A]'
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </p>
          </motion.div> */}
        {/* </motion.div> */}
      </div>
    </motion.section>
  );
}
