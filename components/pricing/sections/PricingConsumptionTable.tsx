
import React from 'react';
import { Superscript, PriceRow } from '../PricingComponents';
import { PricingCalculations } from '../PricingTypes';
import { footnote2Text } from '../PricingConstants';

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
                                <div className="flex flex-col text-left mr-2">
                                    <span className="font-bold text-raiffeisen-green text-[10px] uppercase tracking-wider mb-0.5">Ihre Gemeinschaft</span>
                                    <span className="leading-tight text-[#2b2d33]">{calc.communities.eeg}</span>
                                </div>
                            ) : "Energiegemeinschaft"
                        }
                        value={
                            <div className="flex items-center gap-2 justify-end">
                                <span className="whitespace-nowrap">
                                   {calc.eegPrefix}{calc.priceEEG.toFixed(2).replace('.', ',')} ct/kWh
                                </span>
                            </div>
                        } 
                        hasInfo
                        infoText={
                            <span>
                                Wo verfügbar.<br/>
                                Der genannte "ab Preis" ist ein rechnerischer Wert für Mitglieder einer Erneuerbaren-Energie-Gemeinschaft (EEG). Er setzt sich zusammen aus dem Energiepreis der EEG abzüglich der gesetzlichen Begünstigungen für lokalen Strombezug: Entfall des Erneuerbaren-Förderbeitrags, Entfall der Elektrizitätsabgabe sowie 28 % Reduktion der Arbeitspreis-Komponente der Netznutzungsentgelte.<br/><br/>
                                Die dargestellte Einsparwirkung im „Ab“-Preis ist daher konzeptionell auf die Rahmenbedingungen ab 2027 ausgerichtet; 2026 kann der Effekt geringer ausfallen.<br/>
                                Die Vergünstigungen werden direkt auf der Netzabrechnung ausgewiesen. Preisangaben exkl. USt.
                            </span>
                        } 
                    />
                )}
                <PriceRow 
                    label={
                        calc.communities.isLocalized ? (
                            <div className="flex flex-col text-left mr-2">
                                 <span className="leading-tight text-gray-700">{calc.communities.beg}</span>
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
                            Preis für den Strom aus Ihrer BEG. Preis exkl. USt.
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
                            Preis für den restlichen Strom, den Sie nicht aus den Energiegemeinschaften erhalten. Preisgarantie laut Tarifblatt. Preis exkl. USt. 
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
                    infoText="Der Grundpreis ist ein fester monatlicher Betrag, der unabhängig von Ihrem Stromverbrauch anfällt. Er deckt die Fixkosten, die im Rahmen eines Stromliefervertrages anfallen. Dazu gehört zum Beispiel die Abrechnung und Rechnungsstellung sowie Kundenservice. Preis exkl. USt."
                />
            </div>
        </>
    );
};
