import ProductSection from './ProductSection';

interface GeneticScreeningSectionProps {
  id: string;
  bgColor: string;
}

export default function GeneticScreeningSection({
  id,
  bgColor,
}: GeneticScreeningSectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='Genetic Screening'
      productDescription='Low-cost PCR/RPA-based genetic screening for CCM1 mutations'
      imageSrc='/assets/platform/genetic-lfa.jpeg'
      features={[
        {
          title: 'POINT-OF-CARE TESTING',
          description:
            'Portable, rapid genetic screening solution designed for resource-limited settings, enabling on-site CCM mutation detection without the need for complex laboratory infrastructure.',
          bulletPoints: [
            'Results in under 60 minutes',
            'PCR and RPA-based detection methods',
            'Minimal training required',
            'Battery-powered operation',
          ],
        },
        {
          title: 'COST-EFFECTIVE',
          description:
            'Dramatically reduces the cost of genetic testing compared to traditional sequencing methods, making screening accessible to underserved communities.',
          bulletPoints: [
            '90% cost reduction vs. traditional sequencing',
            'Bulk testing capabilities',
            'Reusable hardware components',
            'Minimal reagent requirements',
          ],
        },
        {
          title: 'CLINICAL VALIDATION',
          description:
            'Validated against gold-standard sequencing methods with high accuracy and reliability for CCM1 mutation detection.',
          bulletPoints: [
            '95%+ sensitivity and specificity',
            'Comprehensive mutation panel coverage',
            'ISO 13485 certified manufacturing',
            'Regulatory compliance ready',
          ],
        },
      ]}
    />
  );
}
