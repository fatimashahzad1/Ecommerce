import React from 'react';
import { IconProps } from '@/types';

/**
 * AdminPanelIcon - A shield with a star, representing admin access.
 */
export const AdminPanelIcon: React.FC<IconProps> = ({
    width = 24,
    height = 24,
    color = 'white',
    className = '',
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M12 3L4 6.5V11.5C4 17 12 21 12 21C12 21 20 17 20 11.5V6.5L12 3Z"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            strokeLinejoin="round"
        />
        <path
            d="M12 9.5L13.09 12.26L16 12.63L14 14.37L14.54 17.23L12 15.77L9.46 17.23L10 14.37L8 12.63L10.91 12.26L12 9.5Z"
            fill={color}
            stroke={color}
            strokeWidth="0.5"
            strokeLinejoin="round"
        />
    </svg>
);

export default AdminPanelIcon; 