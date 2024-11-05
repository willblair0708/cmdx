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
      productDescription='Advanced neural networks for CCM detection in CT/MRI scans'
      imageSrc='/assets/platform/ai-diagnostics.png'
      features={[
        {
          title: 'DEEP LEARNING ANALYSIS',
          description:
            'State-of-the-art convolutional neural networks trained on extensive datasets of CCM imaging, enabling accurate lesion detection and classification.',
          bulletPoints: [
            'Real-time analysis capabilities',
            'Multi-modal imaging support (CT/MRI)',
            'Automated lesion segmentation',
            'Location and size quantification',
          ],
        },
        {
          title: 'CLINICAL DECISION SUPPORT',
          description:
            'Assists healthcare providers in differentiating CCM lesions from other neurological conditions, reducing misdiagnosis rates.',
          bulletPoints: [
            'Differential diagnosis assistance',
            'Risk stratification',
            'Treatment planning support',
            'Longitudinal tracking',
          ],
        },
        {
          title: 'SEAMLESS INTEGRATION',
          description:
            'Designed to integrate with existing hospital PACS and EMR systems, providing immediate value to clinical workflows.',
          bulletPoints: [
            'DICOM compatibility',
            'Cloud-based processing',
            'HIPAA compliant',
            'API-first architecture',
          ],
        },
      ]}
    />
  );
}
