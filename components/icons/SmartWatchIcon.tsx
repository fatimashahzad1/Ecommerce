import { cn } from '@/lib/utils';

interface SmartWatchIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

/**
 * SmartWatchIcon Component
 * A reusable smartwatch icon component
 */
export const SmartWatchIcon: React.FC<SmartWatchIconProps> = ({
  width = 56,
  height = 56,
  className,
  color = 'black',
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 56 56'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={cn(className)}
  >
    <g clipPath='url(#clip0_834_629)'>
      <path
        d='M35 14H21C17.134 14 14 17.134 14 21V35C14 38.866 17.134 42 21 42H35C38.866 42 42 38.866 42 35V21C42 17.134 38.866 14 35 14Z'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21 42V49H35V42'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21 14V7H35V14'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <line
        x1='24'
        y1='23'
        x2='24'
        y2='34'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='28'
        y1='28'
        x2='28'
        y2='34'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='32'
        y1='26'
        x2='32'
        y2='34'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_834_629'>
        <rect width='56' height='56' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
