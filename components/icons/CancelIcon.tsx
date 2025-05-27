import React from 'react';
import { IconProps } from '@/types';

/**
 * CancelIcon Component
 * A circle with an X, for representing cancellations
 */
export const CancelIcon: React.FC<IconProps> = ({
    width = 24,
    height = 24,
    color = 'currentColor',
    className = '',
}) => (
    <svg
        width={width}
        height={height}
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
    >
        <circle cx='12' cy='12' r='11' stroke={color} strokeWidth='2' fill='none' />
        <line x1='8' y1='8' x2='16' y2='16' stroke={color} strokeWidth='2' strokeLinecap='round' />
        <line x1='16' y1='8' x2='8' y2='16' stroke={color} strokeWidth='2' strokeLinecap='round' />
    </svg>
); 