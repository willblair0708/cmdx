import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import Navbar from '../Navbar';

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

interface HeroSectionProps {
  id: string;
  isMobile?: boolean;
}

// Update the tilt effect hook type definition
const useTiltEffect = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      element.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
};

export default function HeroSection({ id, isMobile }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], ['0%', '10%']);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  const [headerSize, setHeaderSize] = useState('text-[32px]');

  const tiltRef = useRef<HTMLDivElement>(null);
  useTiltEffect(tiltRef);

  // Update particle colors for more medical feel
  const PARTICLE_COLORS = [
    'rgba(59, 130, 246, 0.6)', // blue-500
    'rgba(147, 197, 253, 0.4)', // blue-300
    'rgba(219, 234, 254, 0.3)', // blue-100
    'rgba(96, 165, 250, 0.5)', // blue-400
  ];

  // Interactive particle system
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color:
            PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        });
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(64, 139, 252, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        setHeaderSize('text-[42px]');
      } else if (window.innerWidth > 390) {
        setHeaderSize('text-[36px]');
      } else {
        setHeaderSize('text-[32px]');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-blue-950/90 to-gray-950 text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced background effects */}
      <motion.div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]' />
        <div className='absolute inset-0 bg-[url("/assets/patterns/grid.svg")] opacity-[0.02]' />
        <div className='absolute inset-0 bg-[url("/assets/patterns/dna.svg")] opacity-[0.03]' />

        {/* Animated orbs */}
        <div className='animate-pulse-slow absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent blur-3xl' />
        <div className='animate-pulse-slow absolute bottom-1/4 right-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-transparent blur-3xl' />

        {/* Enhanced canvas overlay */}
        <canvas
          ref={canvasRef}
          className='absolute inset-0 z-10'
          style={{ mixBlendMode: 'screen', opacity: 0.3 }}
        />
      </motion.div>

      <div className='relative z-20 flex h-full flex-col'>
        <Navbar isFixed={false} />

        <motion.div
          className={`relative mx-auto flex max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8 ${
            isMobile ? 'mt-[-60px]' : ''
          }`}
          style={{ opacity, scale }}
        >
          <div
            ref={tiltRef}
            className='relative max-w-4xl transition-transform duration-300 ease-out'
          >
            {/* Enhanced badge */}
            <motion.div
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='relative mb-8 inline-flex items-center gap-3 rounded-full border border-blue-500/10 bg-gradient-to-r from-blue-500/5 via-blue-400/5 to-transparent px-5 py-2 backdrop-blur-sm'
            >
              <div className='relative flex h-6 w-6 items-center justify-center'>
                <div className='absolute h-full w-full animate-ping rounded-full bg-blue-400/20'></div>
                <div className='absolute h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 blur-sm'></div>
                <div className='relative h-3 w-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-500'></div>
              </div>
              <span className='bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-sm font-medium text-transparent'>
                AI-Powered Medical Innovation
              </span>
            </motion.div>

            {/* Enhanced heading */}
            <motion.h1
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-6 text-[42px] font-book leading-tight tracking-tight sm:text-[56px] lg:text-[72px]'
            >
              <span className='relative inline-block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent'>
                Transforming
                <div className='absolute -inset-x-6 -inset-y-4 z-[-1] hidden skew-y-3 bg-gradient-to-r from-blue-500/10 to-transparent blur-xl sm:block' />
              </span>{' '}
              <br />
              <span className='bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent'>
                CCM Diagnostics
              </span>
              <br />
              <span className='bg-gradient-to-r from-white/80 via-white/70 to-white/60 bg-clip-text text-[40px] text-transparent sm:text-[48px] lg:text-[56px]'>
                Through Innovation
              </span>
            </motion.h1>

            {/* Enhanced description */}
            <motion.div
              variants={slideInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='relative mb-12 max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/5 via-blue-400/5 to-transparent p-6 backdrop-blur-sm'
            >
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent opacity-20' />
              <p className='relative text-lg leading-relaxed text-neutral-200/90 sm:text-xl'>
                Pioneering accessible genetic screening and AI-powered imaging
                analysis for cerebral cavernous malformations, bringing advanced
                diagnostics to underserved communities worldwide.
              </p>
            </motion.div>

            {/* Enhanced CTA section */}
            <motion.div
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='flex flex-wrap gap-4'
            >
              <Link
                href='/platform'
                className='group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20'
              >
                <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400/0 via-blue-300/50 to-blue-400/0 transition-transform duration-500 group-hover:translate-x-full' />
                <span className='relative flex items-center gap-2'>
                  Explore Platform
                  <svg
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <path
                      d='M1 8h14M9 2l6 6-6 6'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href='/research'
                className='group relative overflow-hidden rounded-md border border-blue-500/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-blue-500/5'
              >
                <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400/0 via-blue-300/10 to-blue-400/0 transition-transform duration-500 group-hover:translate-x-full' />
                Research & Publications
              </Link>
              <Link
                href='/contact'
                className='group relative overflow-hidden rounded-md border border-blue-500/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-blue-500/5'
              >
                <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-400/0 via-blue-300/10 to-blue-400/0 transition-transform duration-500 group-hover:translate-x-full' />
                Partner With Us
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced impact section */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className={`absolute ${
            isMobile ? 'bottom-[30px]' : 'bottom-[60px]'
          } right-[30px] flex w-[350px] flex-col items-start space-y-4 rounded-2xl border border-blue-500/10 bg-gradient-to-r from-blue-500/5 via-blue-400/5 to-transparent p-6 backdrop-blur-sm sm:bottom-20 sm:right-24`}
        >
          <div className='flex flex-col items-start'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='h-px w-8 bg-gradient-to-r from-blue-400 to-transparent' />
              <p className='text-sm font-book uppercase tracking-wider text-blue-400/80'>
                Global Impact
              </p>
            </div>
            <p className='text-lg font-book leading-snug tracking-tight text-white/90'>
              Transforming CCM diagnostics across Mexico and Spain through
              innovative, accessible medical solutions
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
