
import React from 'react';
import { PhoneIcon, ChevronDownIcon } from './common/Icons';
import { TariffBadge } from './common/TariffBadge';
import { usePricing } from './pricing/usePricing';
import { PricingBenefits } from './pricing/sections/PricingBenefits';
import { PricingConsumptionTable } from './pricing/sections/PricingConsumptionTable';
import { PricingGreenBox } from './pricing/sections/PricingGreenBox';
import { PricingPromoInput } from './pricing/sections/PricingPromoInput';
import { PricingFeedInTable } from './pricing/sections/PricingFeedInTable';

interface Props {
    isProducer: string;
    storageOption: string;
    zipCode: string;
}

export const PricingSidebar: React.FC<Props> = (props) => {
    // Extract logic into custom hook
    const calc = usePricing(props);

    return (
        <div className="bg-white rounded-b-lg shadow-xl sticky top-28 border-t-8 border-raiffeisen-yellow z-10 w-full">
            {/* Mobile Header */}
            <div 
                className="lg:hidden p-4 flex justify-between items-center cursor-pointer bg-white border-b border-gray-100"
                onClick={() => calc.setIsMobileOpen(!calc.isMobileOpen)}
            >
                <div className="flex items-center gap-4">
                     <div className="text-left">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Erwarteter ø-Preis 2026</p>
                        <p className="font-extrabold text-2xl leading-none text-raiffeisen-green">
                            {calc.currentAvg} <span className="text-base font-bold text-[#2b2d33]">ct/kWh</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#2b2d33] hover:text-black">
                    Details {calc.isMobileOpen ? 'ausblenden' : 'anzeigen'}
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${calc.isMobileOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Content Area */}
            <div className={`${calc.isMobileOpen ? 'block' : 'hidden'} lg:block p-6 transition-all duration-300`}>
                <div className="text-center mb-8 hidden lg:block">
                    <TariffBadge as="h3" className="text-base shadow-sm" />
                </div>
                
                <PricingBenefits isPromoActive={calc.isPromoActive} />

                {/* Main Pricing Box Container */}
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 transition-all duration-500">
                     <PricingConsumptionTable calc={calc} />
                     <PricingGreenBox calc={calc} />
                     <PricingPromoInput calc={calc} />
                </div>

                {/* Feed-in Tariff */}
                {props.isProducer === 'yes' && (
                    <PricingFeedInTable calc={calc} />
                )}

                <p className="text-[11px] text-gray-500 mt-6 text-left leading-relaxed">
                    Angebot gültig bei Vertragsabschluss bis 31.03.2026. Der tatsächliche Wechselzeitpunkt kann bis 12 Monate in der Zukunft liegen.
                    <br />
                    Zur besseren Vergleichbarkeit und Darstellung sind alle Preise netto angegeben. Die Abrechnung erfolgt zzgl. 20% USt. 
                    <br />
                    Information: Die Netzkosten und somit auch die Ersparnis werden im ersten Schritt direkt von ihrem Netzbetreiber abgerechnet. 
                </p>

                <div className="mt-8 text-center border-t border-gray-200 pt-6">
                    <p className="font-bold text-[#2b2d33] text-sm">Fragen zur Anmeldung?</p>
                    <a href="tel:+4314351897" className="inline-flex items-center justify-center gap-2 mt-3 px-4 py-2 rounded-full bg-gray-100 hover:bg-raiffeisen-yellow hover:text-black transition-all text-sm font-semibold">
                       <PhoneIcon className="w-4 h-4" /> Kontaktieren Sie uns
                    </a>
                </div>
            </div>
        </div>
    );
}
