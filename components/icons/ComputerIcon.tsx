import { cn } from '@/lib/utils';

interface ComputerIconProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

/**
 * ComputerIcon Component
 * A reusable computer icon
 */
export const ComputerIcon: React.FC<ComputerIconProps> = ({
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
    <g clipPath='url(#clip0_834_613)'>
      <path
        d='M46.6667 9.33337H9.33333C8.04467 9.33337 7 10.378 7 11.6667V35C7 36.2887 8.04467 37.3334 9.33333 37.3334H46.6667C47.9553 37.3334 49 36.2887 49 35V11.6667C49 10.378 47.9553 9.33337 46.6667 9.33337Z'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.3333 46.6666H39.6667'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21 37.3334V46.6667'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35 37.3334V46.6667'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M8 32H48' stroke={color} strokeWidth='2' strokeLinecap='round' />
    </g>
    <defs>
      <clipPath id='clip0_834_613'>
        <rect width='56' height='56' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
