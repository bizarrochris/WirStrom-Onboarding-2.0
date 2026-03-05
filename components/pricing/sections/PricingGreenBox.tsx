
import React from 'react';
import { InfoIcon } from '../PricingComponents';
import { PricingCalculations } from '../PricingTypes';

export const PricingGreenBox: React.FC<{ calc: PricingCalculations }> = ({ calc }) => {
    return (
        <div 
            className={`mt-5 rounded-lg p-4 text-center shadow-lg transform transition-all duration-500 relative cursor-default ${calc.isPromoActive || calc.isStorageDiscountActive ? 'bg-raiffeisen-yellow text-[#2b2d33] scale-105 border-2 border-raiffeisen-yellow' : 'bg-raiffeisen-green text-white scale-105'} ${calc.greenBoxHover ? 'z-40' : ''}`}
            onMouseEnter={() => calc.setGreenBoxHover(true)}
            onMouseLeave={() => calc.setGreenBoxHover(false)}
        >
            <div className={`absolute top-2 right-2 ${calc.greenBoxHover ? 'z-50' : 'z-0'}`}>
                <InfoIcon 
                    variant="white"
                    content={
                        calc.showEEG ? (
                            <span>
                                Sie werden voraussichtlich zu 26 % aus der EEG, zu 36 % aus der BEG und zu 38 % mit Raiffeisen Ökostrom versorgt.
                                <br/>Jede dieser Energiequellen hat ihren eigenen Preis.
                                <br/>Durch die Kombination der drei Anteile ergibt sich der kombinierte Strompreis des Raiffeisen WirStrom Tarifs unter Berücksichtigung aller Ersparnisse bei den Netzentgelten und Abgaben.
                                <br/>Hinweis: 2026 ist die Elektrizitätsabgabe gesetzlich befristet reduziert und diese Ersparnis wurde bei der Berechnung des erwarteten ø-Preises berücksichtigt. Alle Preise exkl. USt.
                            </span>
                        ) : (
                            <span>
                                Sie werden voraussichtlich zu 50 % aus der BEG und zu 50 % mit Raiffeisen Ökostrom versorgt.
                                <br/>Jede dieser Energiequellen hat ihren eigenen Preis.
                                <br/>Durch die Kombination der zwei Anteile ergibt sich der kombinierte Strompreis des Raiffeisen WirStrom Tarifs unter Berücksichtigung aller Ersparnisse bei den Netzentgelten und Abgaben.
                                <br/>Alle Preise exkl. USt
                            </span>
                        )
                    }
                />
            </div>
            
            <div className="flex items-center justify-center gap-1">
                 <p className="text-xs font-medium opacity-90 uppercase tracking-wider">Erwarteter Ø-Preis 2026</p>
            </div>
            <p className="font-extrabold text-3xl mt-1 leading-none transition-all">
                {calc.currentAvg} 
                <span className="text-lg font-bold"> ct/kWh</span>
            </p>
        </div>
    );
};
