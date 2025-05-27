import React from 'react';

interface CloseIconProps {
    width?: number;
    height?: number;
    color?: string;
    className?: string;
}

/**
 * CloseIcon Component
 * A simple X/cross icon for close/delete actions
 */
export const CloseIcon: React.FC<CloseIconProps> = ({
    width = 20,
    height = 20,
    color = 'currentColor',
    className = '',
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <line x1="4" y1="4" x2="16" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="4" x2="4" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
); 