import React from 'react';
import { IconProps } from '@/types';

/**
 * LogoutIcon Component
 * An arrow leaving a door, for representing logout
 */
export const LogoutIcon: React.FC<IconProps> = ({
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
        <rect x='3' y='4' width='8' height='16' rx='2' stroke={color} strokeWidth='2' fill='none' />
        <path d='M16 8L20 12L16 16' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        <path d='M9 12H20' stroke={color} strokeWidth='2' strokeLinecap='round' />
    </svg>
); 