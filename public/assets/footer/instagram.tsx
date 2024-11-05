import * as React from 'react';
import type { SVGProps } from 'react';

interface InstagramIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  color?: string;
}

const InstagramIcon: React.FC<InstagramIconProps> = ({
  size,
  className,
  color = '#000',
  ...props
}) => (
  <svg
    width={size || '24'}
    height={size || '25'}
    viewBox='0 0 24 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      d='M12 4.5918C14.173 4.5918 14.445 4.6018 15.298 4.6398C16.15 4.6788 16.731 4.8138 17.24 5.0118C17.766 5.2158 18.213 5.4898 18.657 5.9348C19.102 6.3788 19.376 6.8248 19.58 7.3518C19.778 7.8608 19.913 8.4418 19.952 9.2938C19.99 10.1468 20 10.4188 20 12.5918C20 14.7648 19.99 15.0368 19.952 15.8898C19.913 16.7418 19.778 17.3228 19.58 17.8318C19.379 18.3656 19.064 18.8492 18.657 19.2488C18.212 19.6938 17.767 19.9678 17.24 20.1718C16.731 20.3698 16.15 20.5048 15.298 20.5438C14.445 20.5828 14.173 20.5918 12 20.5918C9.827 20.5918 9.555 20.5818 8.702 20.5438C7.85 20.5048 7.269 20.3698 6.76 20.1718C6.22617 19.9708 5.74259 19.6558 5.343 19.2488C4.93593 18.8492 4.62093 18.3656 4.42 17.8318C4.222 17.3228 4.087 16.7418 4.048 15.8898C4.01 15.0368 4 14.7648 4 12.5918C4 10.4188 4.01 10.1468 4.048 9.2938C4.087 8.4418 4.222 7.8608 4.42 7.3518C4.624 6.8258 4.898 6.3788 5.343 5.9348C5.787 5.4898 6.233 5.2158 6.76 5.0118C7.269 4.8138 7.85 4.6788 8.702 4.6398C9.555 4.6018 9.827 4.5918 12 4.5918ZM12 6.0328C9.864 6.0328 9.61 6.0418 8.767 6.0798C7.987 6.1158 7.564 6.2458 7.282 6.3558C6.908 6.5008 6.642 6.6738 6.362 6.9538C6.082 7.2338 5.909 7.4998 5.764 7.8738C5.654 8.1558 5.524 8.5788 5.488 9.3588C5.45 10.2028 5.441 10.4558 5.441 12.5918C5.441 14.7278 5.45 14.9818 5.488 15.8248C5.524 16.6048 5.654 17.0278 5.764 17.3098C5.909 17.6838 6.082 17.9498 6.362 18.2298C6.642 18.5098 6.908 18.6828 7.282 18.8278C7.564 18.9378 7.987 19.0678 8.767 19.1038C9.611 19.1418 9.864 19.1508 12 19.1508C14.136 19.1508 14.39 19.1418 15.233 19.1038C16.013 19.0678 16.436 18.9378 16.718 18.8278C17.092 18.6828 17.358 18.5098 17.638 18.2298C17.918 17.9498 18.091 17.6838 18.236 17.3098C18.346 17.0278 18.476 16.6048 18.512 15.8248C18.55 14.9808 18.559 14.7278 18.559 12.5918C18.559 10.4558 18.55 10.2018 18.512 9.3588C18.476 8.5788 18.346 8.1558 18.236 7.8738C18.1079 7.52631 17.9036 7.21194 17.638 6.9538C17.3799 6.68822 17.0655 6.48388 16.718 6.3558C16.436 6.2458 16.013 6.1158 15.233 6.0798C14.389 6.0418 14.136 6.0328 12 6.0328ZM12.002 15.1868C12.3431 15.1868 12.6809 15.1196 12.996 14.9891C13.3112 14.8585 13.5975 14.6672 13.8387 14.426C14.0799 14.1848 14.2712 13.8985 14.4018 13.5833C14.5323 13.2682 14.5995 12.9304 14.5995 12.5893C14.5995 12.2482 14.5323 11.9104 14.4018 11.5953C14.2712 11.2801 14.0799 10.9938 13.8387 10.7526C13.5975 10.5114 13.3112 10.3201 12.996 10.1895C12.6809 10.059 12.3431 9.9918 12.002 9.9918C11.3131 9.9918 10.6524 10.2655 10.1653 10.7526C9.67816 11.2397 9.4045 11.9004 9.4045 12.5893C9.4045 13.2782 9.67816 13.9389 10.1653 14.426C10.6524 14.9131 11.3131 15.1868 12.002 15.1868ZM12.002 8.5878C12.5275 8.5878 13.0478 8.6913 13.5333 8.89239C14.0188 9.09349 14.4599 9.38824 14.8315 9.75981C15.2031 10.1314 15.4978 10.5725 15.6989 11.058C15.9 11.5435 16.0035 12.0638 16.0035 12.5893C16.0035 13.1148 15.9 13.6351 15.6989 14.1206C15.4978 14.6061 15.2031 15.0472 14.8315 15.4188C14.4599 15.7904 14.0188 16.0851 13.5333 16.2862C13.0478 16.4873 12.5275 16.5908 12.002 16.5908C10.9407 16.5908 9.92294 16.1692 9.17251 15.4188C8.42209 14.6684 8.0005 13.6506 8.0005 12.5893C8.0005 11.528 8.42209 10.5102 9.17251 9.75981C9.92294 9.00938 10.9407 8.5878 12.002 8.5878ZM17.004 8.5878C17.004 8.85301 16.8986 9.10737 16.7111 9.2949C16.5236 9.48244 16.2692 9.5878 16.004 9.5878C15.7388 9.5878 15.4844 9.48244 15.2969 9.2949C15.1094 9.10737 15.004 8.85301 15.004 8.5878C15.004 8.32258 15.1094 8.06823 15.2969 7.88069C15.4844 7.69315 15.7388 7.5878 16.004 7.5878C16.2692 7.5878 16.5236 7.69315 16.7111 7.88069C16.8986 8.06823 17.004 8.32258 17.004 8.5878Z'
      fill={color}
    />
  </svg>
);

export default InstagramIcon;