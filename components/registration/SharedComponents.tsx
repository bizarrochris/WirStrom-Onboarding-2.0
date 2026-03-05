
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckCircleIcon } from '../common/Icons';
import { isValid } from './RegistrationUtils';

export { isValid };

export const useTooltipRegistry = (isOpen: boolean, setIsOpen: (v: boolean) => void) => {
    const id = useRef(Math.random().toString(36).substr(2, 9));
    useEffect(() => {
        const handleTooltipOpen = (event: CustomEvent) => {
            if (event.detail.id !== id.current) setIsOpen(false);
        };
        window.addEventListener('tooltip-open', handleTooltipOpen as EventListener);
        return () => window.removeEventListener('tooltip-open', handleTooltipOpen as EventListener);
    }, [setIsOpen]);
    useEffect(() => {
        if (isOpen) {
            const event = new CustomEvent('tooltip-open', { detail: { id: id.current } });
            window.dispatchEvent(event);
        }
    }, [isOpen]);
};

export const InfoIcon: React.FC<{ content: React.ReactNode }> = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useTooltipRegistry(isOpen, setIsOpen);
    const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setIsOpen(true); };
    const handleLeave = () => { timeoutRef.current = setTimeout(() => setIsOpen(false), 2500); };

    return (
        <span className={`relative inline-block ml-1 align-middle ${isOpen ? 'z-50' : 'z-0'}`} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <button type="button" className={`flex items-center justify-center w-4 h-4 rounded-full border text-[10px] leading-none transition-colors ${isOpen ? 'border-raiffeisen-green text-raiffeisen-green bg-raiffeisen-green/10' : 'border-gray-400 text-gray-400 hover:text-raiffeisen-green hover:border-raiffeisen-green'}`} onClick={(e) => { e.preventDefault(); isOpen ? handleLeave() : handleEnter(); }}>i</button>
             {isOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-gray-800 text-white text-xs rounded shadow-lg z-50 leading-tight font-normal text-left" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                    {content}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
                </div>
            )}
        </span>
    );
};

export const ProgressIndicator: React.FC<{ currentStep: number, totalSteps: number }> = ({ currentStep }) => {
    const steps = [{ id: 1, name: 'Persönliche Daten' }, { id: 2, name: 'Tarifdetails' }, { id: 3, name: 'Zahlung & Abschluss' }];
    return (
        <nav aria-label="Progress">
            <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0 mb-8">
                {steps.map((step) => (
                    <li key={step.name} className="md:flex-1">
                        {currentStep > step.id ? (
                            <div className="group flex w-full flex-col border-l-4 border-raiffeisen-green py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-bold text-raiffeisen-green transition-colors">{`0${step.id}`}</span>
                                <span className="text-sm font-medium text-[#2b2d33]">{step.name}</span>
                            </div>
                        ) : currentStep === step.id ? (
                            <div className="flex w-full flex-col border-l-4 border-raiffeisen-yellow py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                                <span className="text-sm font-bold text-[#2b2d33]">{`0${step.id}`}</span>
                                <span className="text-sm font-bold text-[#2b2d33]">{step.name}</span>
                            </div>
                        ) : (
                            <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                                <span className="text-sm font-medium text-gray-400 transition-colors">{`0${step.id}`}</span>
                                <span className="text-sm font-medium text-gray-400">{step.name}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export const getInputClass = (fieldName: string, value: string | undefined, isInvalid: boolean = false) => {
    const base = "w-full bg-white border rounded-lg p-3.5 focus:outline-none focus:ring-2 transition-shadow pr-10 relative";
    const valid = isValid(fieldName, value);
    
    if (isInvalid) return `${base} border-red-500 focus:ring-red-200 focus:border-red-500`;
    if (valid) return `${base} border-green-500 focus:ring-green-200 focus:border-green-500`;
    return `${base} border-gray-300 focus:ring-raiffeisen-green focus:border-raiffeisen-green`;
};

export const labelClasses = "block text-sm font-bold text-[#2b2d33] mb-1.5";

// Shared Input Components to reduce boilerplate
export const FormInput: React.FC<any> = ({ label, id, name, value, onChange, onInvalid, type = "text", required, validationType, className, inputClassName, children, ...props }) => (
    <div className={className}>
        <label htmlFor={id} className={labelClasses}>{label}{required && '*'}</label>
        <div className="relative">
            <input 
                type={type} 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange} 
                onInvalid={onInvalid} 
                required={required} 
                className={`${getInputClass(validationType, value)} ${inputClassName || ''}`}
                {...props} 
            />
            {isValid(validationType, value) && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"><CheckCircleIcon className="w-5 h-5" /></div>}
            {children}
        </div>
    </div>
);

export const FormSelect: React.FC<any> = ({ label, id, name, value, onChange, onInvalid, required, options, disabled, validationType, className }) => (
    <div className={className}>
        <label htmlFor={id} className={labelClasses}>{label}{required && '*'}</label>
        <div className="relative">
            <select 
                id={id} 
                name={name} 
                required={required} 
                value={value} 
                onChange={onChange} 
                onInvalid={onInvalid} 
                disabled={disabled}
                className={`${getInputClass(validationType || 'text', value)} appearance-none ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
            >
                <option value="" disabled>Bitte wählen...</option>
                {options.map((opt: any) => (
                    <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
                ))}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
    </div>
);

export const FormCheckbox: React.FC<any> = ({ name, checked, onChange, label, className }) => (
     <div className={`flex items-center gap-2 cursor-pointer ${className}`}>
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" />
        <span className="text-sm">{label}</span>
    </div>
);

export const FormRadio: React.FC<any> = ({ name, value, checked, onChange, label, onInvalid, required }) => (
    <label className="flex items-center gap-2 cursor-pointer">
        <input 
            type="radio" 
            name={name} 
            value={value} 
            checked={checked} 
            onChange={onChange} 
            onInvalid={onInvalid}
            required={required}
            className="w-5 h-5 accent-raiffeisen-green border border-gray-300 rounded bg-white" 
        /> 
        {label}
    </label>
);
