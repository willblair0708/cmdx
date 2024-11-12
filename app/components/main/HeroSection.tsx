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

  // Update particle colors for modern tech feel
  const PARTICLE_COLORS = [
    'rgba(169, 10, 12, 0.3)',  // #A90A0C with opacity
    'rgba(30, 58, 138, 0.3)',  // dark blue
    'rgba(169, 10, 12, 0.4)',  // #A90A0C slightly stronger
    'rgba(30, 58, 138, 0.4)',  // dark blue stronger
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
      connections: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 20000);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          color:
            PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
          connections: 0,
        });
      }
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.connections = 0;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        particles.forEach((p2) => {
          if (p === p2) return;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120 && p.connections < 3 && p2.connections < 3) {
            const opacity = 1 - distance / 120;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(64, 139, 252, ${opacity * 0.15})`;
            ctx.lineWidth = opacity * 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            if (Math.random() < 0.001) {
              const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 2;
              ctx.stroke();
            }

            p.connections++;
            p2.connections++;
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
      className='relative h-screen overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F]'
    >
      {/* Background effects */}
      <motion.div className='absolute inset-0 z-0'>
        <div className='absolute inset-0'>
          <Image
            src='/assets/main/neural-network.jpg'
            alt='Neural network visualization'
            fill
            priority
            quality={90}
            className='object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-[#112240]/80 to-[#0A192F]/90' />
        </div>
        <canvas
          ref={canvasRef}
          className='absolute inset-0 z-10'
          style={{
            mixBlendMode: 'screen',
            opacity: 0.3,
          }}
        />
      </motion.div>

      <div className='relative z-20 flex h-full flex-col'>
        <Navbar isFixed={false} />

        <motion.div className='relative mx-auto flex max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8'>
          <div className='relative max-w-4xl'>
            {/* Category badge */}
            <motion.div
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-8 inline-flex items-center gap-3 rounded-full border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent px-5 py-2 backdrop-blur-sm'
            >
              <span className='bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-sm font-medium text-transparent'>
                Genetic Screening • AI Diagnostics • Preventative Medicine
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='mb-6 text-4xl font-book leading-tight tracking-tight sm:text-5xl lg:text-6xl'
            >
              <span className='text-white'>
                Deep-Tech Diagnostics for
              </span>
              <br />
              <span className='text-[#808080]'>
                Neurological Disorders
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              variants={slideInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='relative mb-12 max-w-2xl'
            >
              <p className='text-lg leading-relaxed text-neutral-200/90 sm:text-xl'>
                Pioneering accessible genetic screening and AI-powered imaging analysis for cerebral cavernous malformations, bringing advanced diagnostics to underserved communities worldwide.
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={fadeInVariants}
              initial='hidden'
              animate={isInView ? 'visible' : 'hidden'}
              className='flex flex-wrap gap-4'
            >
              <Link
                href='/platform'
                className='group relative overflow-hidden rounded-xl bg-blue-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20'
              >
                <span className='relative flex items-center gap-2'>
                  Our Platform
                  <svg className='h-4 w-4' viewBox='0 0 16 16' fill='none'>
                    <path d='M1 8h14M9 2l6 6-6 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                  </svg>
                </span>
              </Link>
              <Link
                href='/research'
                className='group relative overflow-hidden rounded-md border border-[#A90A0C]/10 bg-white/[0.02] px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04]'
              >
                Clinical Research
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Impact metrics */}
        <motion.div
          variants={fadeInVariants}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          className='absolute bottom-12 right-12 max-w-sm rounded-2xl border border-[#A90A0C]/10 bg-gradient-to-r from-[#A90A0C]/5 to-transparent p-6 backdrop-blur-sm'
        >
          <div className='space-y-6'>
            <div>
              <p className='text-sm font-medium uppercase tracking-wider text-[#A90A0C]'>
                Clinical Impact
              </p>
              <p className='mt-2 text-lg font-book leading-snug text-white/90'>
                Advancing CCM diagnostics across Mexico and Spain
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4 border-t border-[#A90A0C]/10 pt-4'>
              <div>
                <p className='text-2xl font-semibold text-white'>95%</p>
                <p className='text-sm text-white/60'>Detection Accuracy</p>
              </div>
              <div>
                <p className='text-2xl font-semibold text-white'>90%</p>
                <p className='text-sm text-white/60'>Cost Reduction</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
