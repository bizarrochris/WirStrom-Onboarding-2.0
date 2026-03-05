
import React from 'react';
import { ShieldCheckIcon } from '../../common/Icons';
import { PricingCalculations } from '../PricingTypes';

export const PricingPromoInput: React.FC<{ calc: PricingCalculations }> = ({ calc }) => {
    return (
        <div className="mt-6 pt-4 border-t border-gray-200 min-h-[60px] flex items-center justify-center">
            {calc.isPromoActive ? (
                <div className="flex items-center gap-2 text-raiffeisen-green bg-green-50 p-2 rounded border border-green-100 animate-in fade-in slide-in-from-bottom-2 duration-500 w-full">
                    <ShieldCheckIcon className="w-5 h-5 flex-shrink-0" />
                    <div className="text-xs font-medium">
                        Empfehlungscode <span className="font-bold">{calc.promoInput.toUpperCase()}</span> angewendet.
                        <br/>Preise wurden aktualisiert.
                    </div>
                </div>
            ) : calc.promoSubmitted ? (
                <div className="text-xs text-gray-400 bg-gray-50 py-2 px-4 rounded-full border border-gray-100 flex items-center gap-2 cursor-pointer hover:bg-gray-100 hover:text-gray-600 transition-colors" onClick={() => calc.setPromoSubmitted(false)} title="Klicken zum Bearbeiten">
                    <span>✓ Angabe gespeichert</span>
                </div>
            ) : (
                <div className="group w-full">
                    <label htmlFor="referral" className="block text-[11px] text-gray-400 font-medium mb-1 group-focus-within:text-raiffeisen-green transition-colors">
                        Wie haben Sie von uns erfahren? (Code)
                    </label>
                    <input
                        type="text"
                        id="referral"
                        placeholder="z.B. Empfehlung, Social Media..."
                        value={calc.promoInput}
                        onChange={calc.handlePromoChange}
                        onBlur={calc.handlePromoBlur}
                        onKeyDown={calc.handlePromoKeyDown}
                        className="w-full text-sm bg-transparent border-b border-gray-300 py-1 focus:outline-none focus:border-raiffeisen-green focus:bg-gray-50 transition-all placeholder-gray-300"
                    />
                </div>
            )}
        </div>
    );
};
