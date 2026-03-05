
import React from 'react';
import { InfoIcon, PriceRow } from '../PricingComponents';
import { PricingCalculations } from '../PricingTypes';

export const PricingFeedInTable: React.FC<{ calc: PricingCalculations }> = ({ calc }) => {
    return (
        <div className="mt-6 bg-gray-50 rounded-lg p-5 border border-gray-100">
            <h4 className="font-bold text-[#2b2d33] text-lg mb-4 border-b-2 border-raiffeisen-yellow inline-block pb-1">Einspeisevergütung</h4>
            <div className="space-y-1 text-sm">
                {calc.showEEG && (
                    <PriceRow label="Energiegemeinschaft" value={`${calc.feedInEEG.toFixed(2).replace('.', ',')} ct/kWh`} hasInfo infoText="Vergütung für Strom, der direkt von Nachbarn in der regionalen Energiegemeinschaft genutzt wird." />
                )}
                <PriceRow label="Bürgerenergiegemeinschaft" value={`${calc.feedInBEG.toFixed(2).replace('.', ',')} ct/kWh`} hasInfo infoText="Vergütung für Strom, der von den Mitgliedern der Bürgerenergiegemeinschaft genutzt wird." />
                <PriceRow 
                    label="Raiffeisen Ökostrom" 
                    value={
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2 justify-end">
                                <span className="bg-raiffeisen-yellow text-[#2b2d33] text-[10px] font-bold px-1.5 py-0.5 rounded mr-1">Fix</span>
                                <span className={`whitespace-nowrap transition-colors duration-300 ${calc.isPromoActive ? 'text-raiffeisen-green scale-110 origin-right font-extrabold' : ''}`}>
                                    {calc.feedInOeko.toFixed(2).replace('.', ',')} ct/kWh
                                </span>
                            </div>
                            {calc.isPromoActive && (
                                <div className="flex items-center gap-2 flex-wrap justify-end">
                                    <span className="text-xs text-gray-500 line-through">
                                        statt 4,00 ct/kWh
                                    </span>
                                    <span className="bg-raiffeisen-yellow text-[#2b2d33] text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        Mitarbeiterbonus
                                    </span>
                                </div>
                            )}
                        </div>
                    }
                    hasInfo
                    infoText="Vergütung für überschüssigen Strom, der am Markt verkauft wird."
                />
                <PriceRow 
                    label="Einspeisung" 
                    value={
                        <div className="flex items-center gap-2 justify-end">
                            <span>
                                0,00 € / Monat
                            </span>
                        </div>
                    }
                    hasInfo
                    infoText="Monatliche Gebühr für die Abwicklung Ihrer Einspeisung."
                />
            </div>
            <div className="mt-4 bg-white border-2 border-raiffeisen-green text-raiffeisen-green rounded-lg p-3 text-center">
                 <div className="flex items-center justify-center gap-1">
                    <p className="text-xs font-medium uppercase tracking-wider">Erwartete Ø-Vergütung</p>
                    <InfoIcon content={
                        calc.showEEG ? (
                            <span>
                                Ihre durchschnittliche Vergütung pro kWh, basierend auf einer typischen Verteilung der Einspeisung.
                                <br/>50% Eigenverbrauch
                                <br/>je 15% Verbrauch in den Energiegemeinschaften
                                <br/>20% Einspeisung ins Netz
                            </span>
                        ) : (
                            <span>
                                Ihre durchschnittliche Vergütung pro kWh, basierend auf einer typischen Verteilung der Einspeisung.
                                <br/>50% Eigenverbrauch
                                <br/>25% Verbrauch in der BEG
                                <br/>25% Einspeisung ins Netz
                            </span>
                        )
                    } />
                </div>
                <p className="font-extrabold text-2xl mt-1">
                    {calc.currentAvgFeedIn} 
                    <span className="text-base font-bold"> ct/kWh</span>
                </p>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 text-center leading-tight">
                Die Verrechnung der Einspeisevergütung erfolgt für Überschusseinspeisung netto, solange der Vertragsnehmer unter die Kleinunternehmer fällt. Andernfalls erfolgt die Verrechnung mit 20% USt.
            </p>
        </div>
    );
};
