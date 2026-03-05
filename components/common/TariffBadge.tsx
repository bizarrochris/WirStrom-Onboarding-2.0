
import React from 'react';

export const TariffBadge: React.FC<{ as?: React.ElementType, className?: string }> = ({ as: Component = 'div', className = '' }) => {
    const baseClasses = "inline-flex items-center justify-center bg-[#69B29D] text-white rounded-[50px] px-4 py-1.5 whitespace-nowrap tracking-wide";
    return (
        <Component className={`${baseClasses} ${className}`}>
            <span className="font-bold">Raiffeisen</span>
            <span className="font-light ml-1.5">WirStrom</span>
        </Component>
    );
};