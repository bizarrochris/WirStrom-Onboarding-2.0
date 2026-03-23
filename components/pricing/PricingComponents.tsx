
import React, { useState, useRef, useEffect } from 'react';

// --- Tooltip Logic ---
export const useTooltipRegistry = (isOpen: boolean, setIsOpen: (v: boolean) => void) => {
    const id = useRef(Math.random().toString(36).substr(2, 9));

    useEffect(() => {
        const handleTooltipOpen = (event: CustomEvent) => {
            if (event.detail.id !== id.current) {
                setIsOpen(false);
            }
        };

        window.addEventListener('tooltip-open', handleTooltipOpen as EventListener);
        return () => {
            window.removeEventListener('tooltip-open', handleTooltipOpen as EventListener);
        };
    }, [setIsOpen]);

    useEffect(() => {
        if (isOpen) {
            const event = new CustomEvent('tooltip-open', { detail: { id: id.current } });
            window.dispatchEvent(event);
        }
    }, [isOpen]);
};

// --- UI Components ---

export const InfoIcon: React.FC<{ content: React.ReactNode; variant?: 'default' | 'white'; className?: string }> = ({ content, variant = 'default', className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    useTooltipRegistry(isOpen, setIsOpen);

    const handleEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 2500);
    };

    const buttonClasses = variant === 'white'
        ? `border-white text-white ${isOpen ? 'bg-white/20' : 'hover:bg-white/20'}`
        : `${isOpen ? 'border-raiffeisen-green text-raiffeisen-green bg-raiffeisen-green/10' : 'border-gray-400 text-gray-400 hover:text-raiffeisen-green hover:border-raiffeisen-green'}`;

    return (
        <span 
            className={`relative inline-block align-middle ${isOpen ? 'z-50' : 'z-0'} ${className || 'ml-1'}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <button 
                type="button"
                className={`flex items-center justify-center w-4 h-4 rounded-full border text-[10px] leading-none transition-colors ${buttonClasses}`}
                onClick={(e) => { e.preventDefault(); isOpen ? handleLeave() : handleEnter(); }}
                aria-label="Information"
            >
                i
            </button>
             {isOpen && (
                <div 
                    className="absolute bottom-full right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 mb-2 w-72 md:w-80 p-3 bg-gray-800 text-white text-xs rounded shadow-lg z-50 leading-tight font-normal text-left whitespace-normal break-words"
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                >
                    {content}
                    <div className="absolute top-full right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </span>
    );
};

export const Superscript: React.FC<{ num: string, content: React.ReactNode, align?: 'center' | 'left', colorClass?: string }> = ({ num, content, align = 'center', colorClass = 'text-gray-500 hover:text-raiffeisen-green' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useTooltipRegistry(isOpen, setIsOpen);

    const handleEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 2500);
    };
    
    const desktopPositionClass = align === 'left' 
        ? 'md:left-auto md:right-0 md:translate-x-2' 
        : 'md:left-1/2 md:-translate-x-1/2';

    const arrowPositionClass = align === 'left'
        ? 'md:left-auto md:right-2'
        : 'md:left-1/2 md:-translate-x-1/2';

    return (
        <span 
            className={`relative inline-block align-top -mt-1 ml-0.5 ${isOpen ? 'z-50' : 'z-0'}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <span 
                className={`cursor-pointer text-[10px] font-bold ${colorClass}`}
            >
                {num}
            </span>
            {isOpen && (
                <div 
                    className={`absolute bottom-full mb-1 w-72 md:w-96 max-w-[90vw] p-3 bg-gray-800 text-white text-xs rounded shadow-xl z-50 leading-tight font-normal text-left whitespace-normal break-words right-0 normal-case tracking-normal ${desktopPositionClass}`}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                >
                    {content}
                    <div className={`absolute top-full -mt-1 border-4 border-transparent border-t-gray-800 right-0.5 ${arrowPositionClass}`}></div>
                </div>
            )}
        </span>
    );
};

export const Benefit: React.FC<{ icon: React.ReactNode; label: React.ReactNode; value: React.ReactNode }> = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="text-raiffeisen-green mt-0.5">{icon}</div>
        <div>
            <p className="font-bold text-[#2b2d33] text-lg">{label}</p>
            <div className="text-sm text-gray-600 mt-0.5">{value}</div>
        </div>
    </div>
);

export const PriceRow: React.FC<{ label: React.ReactNode; value: React.ReactNode; hasInfo?: boolean; infoText?: string | React.ReactNode; highlight?: boolean }> = ({ label, value, hasInfo = false, infoText, highlight = false }) => (
    <div className={`flex justify-between items-center py-3 border-b border-gray-100 text-sm last:border-0 ${highlight ? 'bg-yellow-50 -mx-5 px-5' : ''}`}>
        <div className="text-gray-700 flex items-center gap-1 flex-1 min-w-0 pr-2">
            <div className="break-words min-w-0">{label}</div>
            {hasInfo && <InfoIcon content={infoText} className="shrink-0" />}
        </div>
        <div className="font-bold text-[#2b2d33] text-right shrink-0 ml-2">
            {value}
        </div>
    </div>
);
