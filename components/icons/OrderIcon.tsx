import React from 'react';
import { IconProps } from '@/types';

/**
 * OrderIcon Component
 * A clipboard with a checkmark, for representing orders
 */
export const OrderIcon: React.FC<IconProps> = ({
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
        <rect x='5' y='4' width='14' height='16' rx='2' stroke={color} strokeWidth='2' fill='none' />
        <rect x='8' y='2' width='8' height='4' rx='1' stroke={color} strokeWidth='2' fill='none' />
        <path d='M9 13l2 2 4-4' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
); 