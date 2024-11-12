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
      productDescription='Rapid, low-cost CRISPR-based genetic screening for CCM1 mutations'
      imageSrc='/assets/platform/genetic-assay.png'
    />
  );
}
