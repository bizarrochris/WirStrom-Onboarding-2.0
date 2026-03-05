
import React from 'react';
import { Button } from '../../common/Button';
import { ChevronDownIcon } from '../../common/Icons';
import { RegistrationFormData } from '../RegistrationTypes';
import { ConsentCommunication } from '../RegistrationConsents';
import { FormInput } from '../SharedComponents';

interface Props {
    formData: RegistrationFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleInvalid: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    formRef: React.RefObject<HTMLFormElement>;
}

export const StepLead: React.FC<Props> = ({ formData, handleChange, handleInvalid, onSubmit, formRef }) => (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100">
        <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
            <h3 className="text-2xl font-medium text-[#2b2d33] mb-2">In 1 Minute Vorteile sichern</h3>
            <p className="text-gray-600 mb-6">Starten Sie hier Ihre Anmeldung. Nach Abschluss erhalten Sie alle weiteren Informationen.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <FormInput label="E-Mail-Adresse" id="email" name="email" value={formData.email} onChange={handleChange} onInvalid={handleInvalid} validationType="email" placeholder="E-Mail hier eingeben" required />
                </div>
                <div>
                    <FormInput label="PLZ" id="leadZip" name="zip" value={formData.zip} onChange={handleChange} onInvalid={handleInvalid} validationType="zip" placeholder="1010" maxLength={4} pattern="\d{4}" title="Bitte geben Sie eine 4-stellige PLZ ein" inputMode="numeric" required />
                </div>
            </div>

            <div className="pt-2">
                <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-start gap-3 hover:border-raiffeisen-green/50 transition-colors">
                    <input type="checkbox" name="consentCommunication" checked={formData.consentCommunication} onChange={handleChange} onInvalid={handleInvalid} required className="mt-1 w-5 h-5 accent-raiffeisen-green shrink-0 border-gray-300 rounded border bg-white" />
                    <div className="text-sm text-gray-700 w-full">
                        <div className="font-bold text-[#2b2d33]">Zustimmung Datenschutz *</div>
                        <details className="mt-1 group">
                            <summary className="text-raiffeisen-green cursor-pointer text-xs font-semibold hover:underline list-none flex items-center gap-1">
                                <span>Details anzeigen</span>
                                <ChevronDownIcon className="w-3 h-3 transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2"><ConsentCommunication /></p>
                        </details>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <Button size="lg" className="w-full font-extrabold text-lg !shadow-none" type="submit">Anmeldung starten & Vorteile sichern</Button>
            </div>
            <p className="text-left text-sm text-[#2b2d33] font-bold">Alle mit * markierten Felder sind Pflichtfelder</p>
        </form>
    </div>
);
