
import React from 'react';
import { CalendarDaysIcon, ShieldCheckIcon, SparklesIcon } from '../../common/Icons';
import { Benefit, Superscript } from '../PricingComponents';
import { footnote1Text } from '../PricingConstants';

interface PricingBenefitsProps {
    isPromoActive: boolean;
}

export const PricingBenefits: React.FC<PricingBenefitsProps> = ({ isPromoActive }) => {
    return (
        <div className="space-y-5 mb-8">
            <Benefit icon={<CalendarDaysIcon className="w-6 h-6" />} label="Jederzeit kündbar" value={<span>Keine Vertragsbindung<Superscript num="1" content={footnote1Text} /></span>} />
            <Benefit 
                icon={<ShieldCheckIcon className="w-6 h-6" />} 
                label="Ökostrom Tarif" 
                value={isPromoActive ? "mit Jahresfixpreis für 2026" : "mit 12 Monaten Preisgarantie"}
            />
            <Benefit icon={<SparklesIcon className="w-6 h-6" />} label="Genossenschaftsbeitrag" value="nur 10,00 € pro Genossenschaft (wird bei Austritt zu 100% erstattet)" />
        </div>
    );
};
