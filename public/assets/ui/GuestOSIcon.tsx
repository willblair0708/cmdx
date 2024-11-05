import * as React from 'react';
import type { SVGProps } from 'react';

interface SvgProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  color?: string;
}

const GuestOSIcon: React.FC<SvgProps> = ({
  size = 24,
  className,
  color = '#fff',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <text
      x='50%'
      y='50%'
      dominantBaseline='middle'
      textAnchor='middle'
      fill={color}
      fontSize='4'
      fontFamily='sans-serif'
    >
      GuestOS
    </text>
  </svg>
);

export default GuestOSIcon;
