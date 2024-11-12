import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';

import DiagnosticAISection from './DiagnosticAISection';
import GeneticScreeningSection from './GeneticScreeningSection';

interface ProductsOverviewProps {
  id: string;
  bgColor: string;
}

export default function ProductsOverview({
  id,
  bgColor,
}: ProductsOverviewProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className='py-24 sm:py-32' ref={ref}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className='mb-16 font-light text-3xl tracking-tight text-white sm:text-4xl'
        >
          Our Platform
        </motion.h2>
        <div className='grid gap-8 lg:grid-cols-2'>
          <GeneticScreeningSection id={`${id}-genetic`} bgColor={bgColor} />
          <DiagnosticAISection id={`${id}-ai`} bgColor={bgColor} />
        </div>
      </div>
    </section>
  );
}
