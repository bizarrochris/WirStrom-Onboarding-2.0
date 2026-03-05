
import React from 'react';
import { Superscript, PriceRow } from '../PricingComponents';
import { PricingCalculations } from '../PricingTypes';
import { footnote2Text, footnote3Text } from '../PricingConstants';

export const PricingConsumptionTable: React.FC<{ calc: PricingCalculations }> = ({ calc }) => {
    return (
        <>
             <div className="flex justify-between items-end mb-4 border-b-2 border-raiffeisen-yellow pb-1">
                <h4 className="font-bold text-[#2b2d33] text-lg">Preise Verbrauch <Superscript num="2" content={footnote2Text} /></h4>
                {calc.isPromoActive && (
                    <span className="text-[10px] bg-[#69B29D] text-white px-2 py-0.5 rounded-full">
                        Bonus aktiv
                    </span>
                )}
                {!calc.isPromoActive && calc.isStorageDiscountActive && (
                    <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                        Speicherbonus aktiv
                    </span>
                )}
             </div>
            
            {/* Verbrauchstarif */}
            <div className="space-y-1 text-sm">
                {calc.showEEG && (
                    <PriceRow 
                        label={
                            calc.communities.isLocalized ? (
                                <div className="flex flex-col text-left">
                                    <span className="font-bold text-raiffeisen-green text-[10px] uppercase tracking-wider mb-0.5">Ihre Gemeinschaft</span>
                                    <span className="leading-tight text-[#2b2d33] max-w-[150px]">{calc.communities.eeg}</span>
                                </div>
                            ) : "Energiegemeinschaft"
                        }
                        value={
                            <div className="flex items-center gap-2 justify-end">
                                <span className="whitespace-nowrap">
                                   {calc.eegPrefix}{calc.priceEEG.toFixed(2).replace('.', ',')} ct/kWh<Superscript num="3" content={footnote3Text} align="left" />
                                </span>
                            </div>
                        } 
                        hasInfo
                        infoText={
                            <span>
                                Wo verfügbar.<br/>
                                Für Strom aus Ihrer EEG zahlen Sie zunächst 12,00 ct/kWh<br/>
                                (vor Abzug gesetzlicher Vergünstigungen)<br/><br/>
                                Sie profitieren dabei von:
                                <ul className="list-disc pl-3 mt-1 space-y-0.5">
                                    <li>28 % Rabatt auf Netzentgelte</li>
                                    <li>Kein Erneuerbaren-Förderbeitrag</li>
                                    <li>Keine Elektrizitätsabgabe</li>
                                </ul>
                                Die Vergünstigungen werden direkt auf der Netzabrechnung ausgewiesen – der effektive Strompreis reduziert sich dadurch automatisch.<br/>
                                Preis exkl. USt.
                            </span>
                        } 
                    />
                )}
                <PriceRow 
                    label={
                        calc.communities.isLocalized ? (
                            <div className="flex flex-col text-left">
                                 <span className="leading-tight text-gray-700 max-w-[150px]">{calc.communities.beg}</span>
                            </div>
                        ) : "Bürgerenergiegemeinschaft"
                    }
                    highlight={calc.isPromoActive}
                    value={
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span className={`whitespace-nowrap transition-colors duration-300 ${calc.isPromoActive ? 'text-raiffeisen-green scale-110 origin-right font-extrabold' : ''}`}>
                                   {calc.priceBEG.toFixed(2).replace('.', ',')} ct/kWh
                                </span>
                            </div>
                            {calc.isPromoActive && (
                                <div className="flex items-center gap-2 flex-wrap justify-end">
                                    <span className="text-xs text-gray-500 line-through">
                                        statt 9,95
                                    </span>
                                    <span className="bg-raiffeisen-yellow text-[#2b2d33] text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        Mitarbeiterbonus
                                    </span>
                                </div>
                            )}
                        </div>
                    } 
                    hasInfo
                    infoText={
                        <span>
                            Für Strom aus Ihrer BEG zahlen Sie {calc.priceBEG.toFixed(2).replace('.', ',')} ct/kWh. Preis exkl. USt.
                        </span>
                    }
                />
                <PriceRow 
                    label={
                        <span className="inline-flex items-center gap-2">
                            <span>Raiffeisen Ökostrom Tarif</span>
                            {calc.isStorageDiscountActive && (
                                <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Plus</span>
                            )}
                        </span>
                    }
                    highlight={calc.isStorageDiscountActive || calc.isPromoActive}
                    value={
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span className={`whitespace-nowrap transition-colors duration-300 ${calc.isStorageDiscountActive || calc.isPromoActive ? 'text-raiffeisen-green scale-110 origin-right font-extrabold' : ''}`}>
                                    {calc.finalPriceStr} ct/kWh
                                </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                                <span className="text-xs text-gray-500 line-through">
                                    statt {calc.strikeThroughPrice}
                                </span>
                                <span className={`${calc.isStorageDiscountActive ? 'bg-orange-500 text-white' : 'bg-raiffeisen-yellow text-[#2b2d33]'} text-[10px] font-bold px-1.5 py-0.5 rounded`}>
                                    {calc.badgeText}
                                </span>
                            </div>
                        </div>
                    } 
                    hasInfo
                    infoText={
                        <span>
                            Für den restlichen Strom zahlen Sie {calc.finalPriceStr} ct/kWh. Dieser Strompreis ist Ihnen für 12 Monate garantiert.<br/>
                            Preis exkl. USt.
                        </span>
                    }
                />
                <PriceRow 
                    label="Grundpreis" 
                    highlight={calc.isPromoActive}
                    value={
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-2">
                                <span className={`whitespace-nowrap transition-colors duration-300 ${calc.isPromoActive ? 'text-raiffeisen-green scale-110 origin-right font-extrabold' : ''}`}>
                                    {calc.monthlyPriceStr} € / Monat
                                </span>
                            </div>
                            {calc.isPromoActive && (
                                <div className="flex items-center gap-2 flex-wrap justify-end">
                                    <span className="text-xs text-gray-500 line-through">
                                        statt {calc.standardMonthlyPrice.toFixed(2).replace('.', ',')} €
                                    </span>
                                    <span className="bg-raiffeisen-yellow text-[#2b2d33] text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        Mitarbeiterbonus
                                    </span>
                                </div>
                            )}
                        </div>
                    } 
                    hasInfo 
                    infoText="Der Grundpreis ist ein fester monatlicher Betrag, der unabhängig von Ihrem Stromverbrauch anfällt. Er deckt die Fixkosten, die im Rahmen eines Stromliefervertrages anfallen. Dazu gehört zum Beispiel die Abrechnung und Rechnungsstellung sowie Kundenservice. Preis excl. USt."
                />
            </div>
        </>
    );
};
