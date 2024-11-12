import ProductSection from './ProductSection';

interface DiagnosticAISectionProps {
  id: string;
  bgColor: string;
}

export default function DiagnosticAISection({
  id,
  bgColor,
}: DiagnosticAISectionProps) {
  return (
    <ProductSection
      id={id}
      bgColor={bgColor}
      productName='AI Diagnostics'
      productDescription='Advanced neural networks for precise CCM detection and analysis in neuroimaging'
      imageSrc='/assets/platform/ai-diagnostics.png'
    />
  );
}
