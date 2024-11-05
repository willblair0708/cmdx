'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FieldValues,
  useForm,
  UseFormRegisterReturn,
  UseFormReturn,
  UseFormWatch,
} from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { toast } from 'sonner';
import { z } from 'zod';

import ArrowIcon from '@/public/assets/ui/Arrow';

import Navbar from '../Navbar';

interface HeroSectionProps {
  id: string;
  bgColor: string;
  isMobile: boolean;
}

const formFields = [
  {
    id: 'firstName',
    label: 'FIRST NAME',
    placeholder: 'First Name',
    type: 'text',
    width: 'half',
  },
  {
    id: 'lastName',
    label: 'LAST NAME',
    placeholder: 'Last Name',
    type: 'text',
    width: 'half',
  },
  {
    id: 'email',
    label: 'EMAIL',
    placeholder: 'Business Email Address',
    type: 'email',
    width: 'half',
  },
  {
    id: 'organization',
    label: 'ORGANIZATION',
    placeholder: 'Organization',
    type: 'text',
    width: 'half',
  },
  {
    id: 'researchArea',
    label: 'RESEARCH AREA',
    placeholder: 'e.g. Drug Discovery, Cell Biology, Disease Modeling',
    type: 'text',
    width: 'half',
  },
  {
    id: 'message',
    label: 'MESSAGE',
    placeholder:
      'Tell us about your research goals. How could our AI-powered virtual cell models help accelerate your drug discovery or disease research?',
    type: 'textarea',
    width: 'full',
  },
] as const;

const formFieldRows = [
  ['firstName', 'lastName'],
  ['email', 'organization'],
  ['researchArea'],
] as const;

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

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
} as const;

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
} as const;

const inputVariants = {
  initial: { y: 0 },
} as const;

const labelVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
} as const;

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => Promise<void>) => Promise<void>;
        execute: (
          siteKey: string,
          options: { action: string }
        ) => Promise<string>;
      };
    };
  }
}

const FormInput = ({
  field,
  form,
  ...props
}: {
  field: (typeof formFields)[number];
  form: UseFormReturn<z.infer<typeof formSchema>>;
} & UseFormRegisterReturn) => {
  const [isFocused, setIsFocused] = useState(false);

  const value = form.watch(field.id, '');
  const hasValue = value.length > 0;

  return (
    <div
      key={field.id}
      className='relative flex w-full flex-col items-start justify-end gap-8'
    >
      <div className='relative flex w-full flex-col items-start justify-center gap-2.5 self-stretch'>
        <motion.div
          className='relative w-full'
          initial='initial'
          animate={isFocused ? 'focus' : 'initial'}
          whileHover='hover'
          variants={inputVariants}
        >
          <motion.input
            type={field.type}
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              e.target.placeholder = '';
            }}
            onBlur={(e) => {
              setIsFocused(false);
              e.target.placeholder = field.placeholder;
            }}
            placeholder={field.placeholder}
            name={field.id}
            className='peer relative flex h-[38px] w-full items-center gap-2.5 self-stretch rounded-[7px] bg-[#18181B] px-5 py-3 text-[12px] font-book tracking-[-0.12px] text-white transition-shadow duration-200 placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20'
          />
          <motion.div
            className='pointer-events-none absolute inset-0 rounded-[7px]'
            animate={{
              boxShadow: isFocused
                ? '0 0 0 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.1)'
                : '0 0 0 1px rgba(255,255,255,0)',
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        <motion.label
          initial='initial'
          animate={isFocused || hasValue ? 'visible' : 'initial'}
          variants={labelVariants}
          className='pointer-events-none absolute -top-6 left-0 origin-left text-xs font-normal leading-[14.4px] tracking-[0.96px] text-white'
        >
          {field.label}
        </motion.label>
        {form.formState.errors[field.id] && (
          <motion.p className='text-sm text-red-500'>
            {form.formState.errors[field.id]?.message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  organization: z.string().min(2),
  researchArea: z.string().min(2),
  message: z.string().min(50),
});

export default function HeroSection({
  id,
  bgColor,
  isMobile,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(
            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
            { action: 'CONTACT' }
          );

          const response = await fetch('https://getform.io/f/bollgpza', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              ...data,
              'g-recaptcha-response': token,
            }),
          });

          console.log('Form submission response:', {
            status: response.status,
            statusText: response.statusText,
          });

          if (response.ok) {
            toast.success(
              'Message sent! Our team will contact you shortly to discuss your research needs.'
            );
            form.reset();
          } else {
            const errorText = await response.text();
            console.error('Form submission error:', errorText);

            if (response.status === 429) {
              toast.error('Too many requests. Please try again later.');
            } else if (response.status === 400) {
              toast.error('Invalid form data. Please check your inputs.');
            } else if (response.status === 401 || response.status === 403) {
              toast.error(
                'Authentication failed. Please refresh and try again.'
              );
            } else {
              toast.error(
                `Failed to send message (${response.status}). Please try again later.`
              );
            }
          }
        } catch (error) {
          console.error('Form submission error:', error);
          if (error instanceof Error) {
            toast.error(`Error: ${error.message}`);
          } else {
            toast.error('Failed to send message. Please try again later.');
          }
        }
      });
    } catch (error) {
      console.error('Recaptcha error:', error);
      if (error instanceof Error) {
        toast.error(`Recaptcha error: ${error.message}`);
      } else {
        toast.error('Failed to verify recaptcha. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const message = form.watch('message', '');
  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className='relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-gray-950 via-blue-950/90 to-gray-950 text-white'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar isFixed={false} />

      <motion.div
        style={{ opacity, scale, y: ySpring }}
        className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:px-8'
      >
        {/* Left Column */}
        <div className='relative z-10 mt-24 max-w-2xl lg:mt-0'>
          {/* Status Badge */}
          <motion.div
            variants={fadeInVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-white/[0.03] px-4 py-2 backdrop-blur-sm'
          >
            <div className='relative h-2 w-2'>
              <div className='absolute h-full w-full animate-ping rounded-full bg-blue-400/20'></div>
              <div className='relative h-full w-full rounded-full bg-blue-400'></div>
            </div>
            <span className='text-sm font-medium text-white/90'>
              AI-Powered Innovation
            </span>
          </motion.div>

          <motion.h1
            variants={slideInVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='mb-6 font-light text-4xl tracking-tight sm:text-6xl lg:text-7xl'
          >
            <span className='text-white'>Transforming</span>
            <br />
            <span className='bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent'>
              CCM Diagnostics
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInVariants}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            className='mb-8 text-lg text-neutral-400'
          >
            Pioneering accessible genetic screening and AI-powered imaging
            analysis for underserved communities worldwide.
          </motion.p>
        </div>

        {/* Right Column - Form */}
        <motion.div
          variants={containerVariants}
          initial='initial'
          animate='animate'
          className='relative mb-12 w-full max-w-xl rounded-2xl border border-blue-500/10 bg-gradient-to-r from-blue-500/5 via-blue-400/5 to-transparent p-8 backdrop-blur-sm lg:mb-0'
        >
          <motion.p
            variants={itemVariants}
            initial='initial'
            animate='animate'
            className='mb-8 text-xl font-medium tracking-tight'
          >
            Request a Demo
          </motion.p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='relative flex w-full flex-col gap-8'
          >
            <input type='hidden' name='_gotcha' className='hidden' />
            {formFieldRows.map((row) => (
              <div
                key={row.join('-')}
                className={`flex w-full ${
                  isMobile
                    ? 'flex-col gap-[50px]'
                    : 'relative flex-[0_0_auto] flex-row gap-[50px] self-stretch'
                }`}
              >
                {row.map((fieldId) => {
                  const field = formFields.find((f) => f.id === fieldId)!;
                  return (
                    <FormInput
                      key={field.id}
                      field={field}
                      form={form}
                      {...form.register(field.id)}
                    />
                  );
                })}
              </div>
            ))}
            <div className='relative flex w-full flex-[0_0_auto] flex-col items-start justify-end gap-8 self-stretch'>
              <div className='relative w-full'>
                <div className='mb-4 flex items-center gap-2'>
                  <svg
                    width='15'
                    height='15'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='2.06641'
                      y='1.96387'
                      width='10.8682'
                      height='10.8682'
                      rx='5.43408'
                      stroke='white'
                    />
                    <rect
                      x='7'
                      y='6.11133'
                      width='1'
                      height='4.57227'
                      fill='#D9D9D9'
                    />
                    <rect
                      x='7'
                      y='4.11133'
                      width='1'
                      height='1'
                      fill='#D9D9D9'
                    />
                  </svg>
                  <p className='text-sm text-white opacity-80'>
                    Share your research objectives and discover how our virtual
                    cell models can enhance your drug discovery pipeline through
                    accurate in silico simulations.
                  </p>
                </div>

                <motion.div
                  initial='initial'
                  whileHover='hover'
                  variants={inputVariants}
                >
                  <textarea
                    placeholder='Your Message'
                    className='peer relative flex w-full items-center gap-2.5 self-stretch rounded-[7px] bg-[#18181B] px-5 pb-20 pt-3 text-base font-book tracking-[-0.12px] transition-shadow duration-200 placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 sm:text-xs'
                    {...form.register('message')}
                  />
                  <motion.div
                    className='pointer-events-none absolute inset-0 rounded-[7px]'
                    animate={{
                      boxShadow: message
                        ? '0 0 0 1px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.1)'
                        : '0 0 0 1px rgba(255,255,255,0)',
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.label
                  initial='initial'
                  animate={message?.length > 0 ? 'visible' : 'initial'}
                  variants={labelVariants}
                  className='pointer-events-none absolute -top-6 left-0 origin-left text-xs font-normal leading-[14.4px] tracking-[0.96px] text-white'
                >
                  MESSAGE
                </motion.label>
                {form.formState.errors.message && (
                  <motion.p className='text-sm text-red-500'>
                    {form.formState.errors.message?.message}
                  </motion.p>
                )}
              </div>
            </div>
            <motion.button
              type='submit'
              disabled={isSubmitting}
              className='group relative -mt-4 inline-flex flex-[0_0_auto] items-center justify-center gap-2.5 rounded-[20000px] bg-zinc-900 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-blue-500/5 disabled:cursor-not-allowed disabled:opacity-50'
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-300/10 to-blue-400/0 transition-transform duration-500' />
              <span className='relative mt-[-1.00px] w-fit whitespace-nowrap text-xs font-normal leading-[13.2px] tracking-[0.96px] text-white'>
                {isSubmitting ? 'SENDING...' : 'REQUEST DEMO'}
              </span>
              {!isSubmitting && (
                <ArrowIcon
                  className='rotate-[-90deg]'
                  color='white'
                  size={10}
                />
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
