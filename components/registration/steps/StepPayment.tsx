
import React from 'react';
import { ChevronDownIcon, LockClosedIcon } from '../../common/Icons';
import { RegistrationFormData } from '../RegistrationTypes';
import { ConsentSEPA, ConsentAGB, ConsentPriceSheet, ConsentMarketing } from '../RegistrationConsents';
import { FormInput, getInputClass, labelClasses, InfoIcon } from '../SharedComponents';

interface Props {
    formData: RegistrationFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleInvalid: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleIbanBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const StepPayment: React.FC<Props> = ({ formData, handleChange, handleInvalid, handleIbanBlur }) => (
    <div className="space-y-6">
        <fieldset className="space-y-4">
            <legend className="text-lg font-bold text-[#2b2d33] mb-4 pr-2 bg-white inline-block">Zahlungsinformationen (SEPA-Lastschrift)</legend>
            <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded">Die Abrechnung erfolgt bequem und sicher per SEPA-Lastschrift.</p>
            
            <div>
                <label htmlFor="accountHolder" className={labelClasses}>Kontoinhaber*</label>
                <input type="text" id="accountHolder" name="accountHolder" value={formData.isAccountHolderSame ? `${formData.firstName} ${formData.lastName}` : formData.accountHolder} onChange={handleChange} onInvalid={handleInvalid} disabled={formData.isAccountHolderSame} required className={`${getInputClass('text', formData.accountHolder)} disabled:bg-gray-100 disabled:text-gray-500`} />
                <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm">
                    <input type="checkbox" name="isAccountHolderSame" checked={formData.isAccountHolderSame} onChange={handleChange} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" /> Kontoinhaber ist ident mit Antragsteller
                </label>
            </div>

            <div className="relative">
                <FormInput 
                    label={
                        <>
                            IBAN 
                            <InfoIcon content="Ihre IBAN wurde von ihrem bestehenden Energiegemeinschaftsvertrag übernommen. Sollten Sie die Verrechnung des Raiffeisen Ökostroms über ein anderes Konto wünschen, können Sie hier eine abweichende IBAN angeben." />
                        </>
                    } 
                    id="iban" name="iban" value={formData.iban} onChange={handleChange} onBlur={handleIbanBlur} onInvalid={handleInvalid} required validationType="iban" placeholder="ATXX XXXX XXXX XXXX XXXX" maxLength={40} className="font-mono" 
                />
            </div>

            <div className="pt-2">
                <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-start gap-3 hover:border-raiffeisen-green/50 transition-colors">
                    <input type="checkbox" name="consentSepaDirectDebit" checked={formData.consentSepaDirectDebit} onChange={handleChange} onInvalid={handleInvalid} required className="mt-1 w-5 h-5 accent-raiffeisen-green shrink-0 border-gray-300 rounded border bg-white" />
                    <div className="text-sm text-gray-700 w-full">
                        <div className="font-bold text-[#2b2d33]">Einwilligung zum SEPA-Lastschriftmandat*</div>
                        <details className="mt-1 group">
                            <summary className="text-raiffeisen-green cursor-pointer text-xs font-semibold hover:underline list-none flex items-center gap-1">
                                <span>Details anzeigen</span>
                                <ChevronDownIcon className="w-3 h-3 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2"><ConsentSEPA /></p>
                        </details>
                    </div>
                </div>
            </div>
        </fieldset>
    
        {(formData.meterNumberLater || (formData.isProducer === 'yes' && formData.einspeiseMeterNumberLater)) && (
            <div className="bg-raiffeisen-yellow/20 border-l-4 border-raiffeisen-yellow text-[#2b2d33] p-4 rounded-md my-4" role="alert">
                <p className="font-bold">Wichtiger Hinweis</p>
                <p className="text-sm">Der Vertrag kommt erst zustande, sobald Sie Ihre Zählpunktnummer(n) nachgereicht haben. Wir werden Sie diesbezüglich kontaktieren.</p>
            </div>
        )}

        <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="grid gap-4">
                <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-start gap-3 hover:border-raiffeisen-green/50 transition-colors">
                    <input type="checkbox" name="consentAGB" checked={formData.consentAGB} onChange={handleChange} onInvalid={handleInvalid} required className="mt-1 w-5 h-5 accent-raiffeisen-green shrink-0 border-gray-300 rounded border bg-white" />
                    <div className="text-sm text-gray-700 w-full">
                        <div className="font-bold text-[#2b2d33]">Einwilligung zu AGB & Widerrufsbelehrung*</div>
                        <details className="mt-1 group">
                            <summary className="text-raiffeisen-green cursor-pointer text-xs font-semibold hover:underline list-none flex items-center gap-1">
                                <span>Details anzeigen</span>
                                <ChevronDownIcon className="w-3 h-3 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2"><ConsentAGB /></p>
                        </details>
                    </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-start gap-3 hover:border-raiffeisen-green/50 transition-colors">
                    <input type="checkbox" name="consentPriceSheet" checked={formData.consentPriceSheet} onChange={handleChange} onInvalid={handleInvalid} required className="mt-1 w-5 h-5 accent-raiffeisen-green shrink-0 border-gray-300 rounded border bg-white" />
                    <div className="text-sm text-gray-700 w-full">
                        <div className="font-bold text-[#2b2d33]">Einwilligung zum Preisblatt*</div>
                        <details className="mt-1 group">
                            <summary className="text-raiffeisen-green cursor-pointer text-xs font-semibold hover:underline list-none flex items-center gap-1">
                                <span>Details anzeigen</span>
                                <ChevronDownIcon className="w-3 h-3 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2"><ConsentPriceSheet /></p>
                        </details>
                    </div>
                </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-start gap-3 hover:border-raiffeisen-green/50 transition-colors">
                <input type="checkbox" name="consentMarketing" checked={formData.consentMarketing} onChange={handleChange} className="mt-1 w-5 h-5 accent-raiffeisen-green shrink-0 border-gray-300 rounded border bg-white" />
                <div className="text-sm text-gray-700 w-full">
                    <div className="font-bold text-[#2b2d33]">Einwilligung zur Kontaktaufnahme & Marketing</div>
                    <details className="mt-1 group">
                        <summary className="text-raiffeisen-green cursor-pointer text-xs font-semibold hover:underline list-none flex items-center gap-1">
                            <span>Details anzeigen</span>
                            <ChevronDownIcon className="w-3 h-3 transition-transform group-open:rotate-180" />
                        </summary>
                        <p className="mt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2"><ConsentMarketing /></p>
                    </details>
                </div>
            </div>
        </div>

        <p className="text-sm text-gray-600 !mt-8">Nach Absenden des Formulars ist Ihr Antrag für den Beitritt zu den Energiegenossenschaften sowie den Tarifwechsel zum Raiffeisen WirStrom Öko-Stromtarif gestellt. Sobald der Antrag bearbeitet wird, erhalten Sie eine E-Mail von unserem Partner MAXENERGY zum Tarifwechsel sowie Informationen unserer Energiegemeinschaftsplattform (team4.energy) mit den nächsten Schritten.</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4 justify-center">
            <LockClosedIcon className="w-5 h-5 text-gray-400" />
            <span>Ihre Daten werden sicher per SSL verschlüsselt.</span>
        </div>
    </div>
);
