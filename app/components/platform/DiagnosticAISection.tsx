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
      productName='Dynamo'
      productDescription='Advanced neural networks for precise CCM detection and analysis in neuroimaging'
      imageSrc='/assets/platform/ai-diagnostics.png'
      features={[
        {
          title: 'ADVANCED AI ANALYSIS',
          description:
            'State-of-the-art deep learning models trained on comprehensive CCM imaging datasets, delivering industry-leading detection accuracy and real-time insights.',
          bulletPoints: [
            'Sub-millimeter lesion detection',
            'Multi-sequence MRI compatibility',
            '3D volumetric analysis',
            'Automated progression tracking',
          ],
        },
        {
          title: 'CLINICAL WORKFLOW INTEGRATION',
          description:
            'Seamlessly enhances radiologist workflow with AI-powered insights, reducing interpretation time and improving diagnostic confidence.',
          bulletPoints: [
            'One-click lesion analysis',
            'Structured reporting system',
            'Priority-based triage',
            'Interactive 3D visualization',
          ],
        },
        {
          title: 'ENTERPRISE PLATFORM',
          description:
            'Secure, scalable cloud infrastructure designed for healthcare environments, with comprehensive integration capabilities.',
          bulletPoints: [
            'HIPAA & GDPR compliant',
            'HL7 & FHIR integration',
            'Full PACS/RIS connectivity',
            'Real-time collaboration tools',
          ],
        },
        {
          title: 'QUALITY ASSURANCE',
          description:
            'Continuous monitoring and validation systems ensure consistent, reliable performance across diverse clinical settings.',
          bulletPoints: [
            'Automated QC protocols',
            'Performance analytics',
            'Regular model updates',
            'Clinical validation tracking',
          ],
        },
      ]}
      metrics={[
        {
          value: '95%',
          label: 'Detection Accuracy',
          subtext: 'Validated across multiple institutions',
        },
        {
          value: '60%',
          label: 'Time Reduction',
          subtext: 'In radiological workflow',
        },
        {
          value: '99.9%',
          label: 'Uptime SLA',
          subtext: 'Enterprise reliability',
        },
      ]}
      certifications={[
        'FDA 510(k) Pending',
        'CE Mark',
        'ISO 13485:2016',
        'SOC 2 Type II',
      ]}
      integrations={['DICOM', 'HL7', 'FHIR', 'REST API']}
    />
  );
}
