
import React from 'react';
import { ChevronDownIcon, CheckCircleIcon } from '../../common/Icons';
import { RegistrationFormData } from '../RegistrationTypes';
import { austrianProviders, consumptionEstimates, METER_PATTERN } from '../RegistrationConfig';
import { ConsentGeneralPowerOfAttorney, ConsentMaxenergyPowerOfAttorney } from '../RegistrationConsents';
import { InfoIcon, FormInput, FormSelect, FormRadio, getInputClass, labelClasses, isValid } from '../SharedComponents';

interface Props {
    formData: RegistrationFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleInvalid: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleMeterPointChange: (arrayName: 'consumptionMeterPoints' | 'einspeiseMeterPoints', index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddMeterPoint: (arrayName: 'consumptionMeterPoints' | 'einspeiseMeterPoints') => void;
    handleRemoveMeterPoint: (arrayName: 'consumptionMeterPoints' | 'einspeiseMeterPoints', idToRemove: number) => void;
    setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>;
    isUniqueMeterNumber: (value: string, currentId: number) => boolean;
    minChangeDate: string;
    handleStorageSelect: (val: string) => void;
}

export const StepTariff: React.FC<Props> = ({ 
    formData, handleChange, handleInvalid, handleMeterPointChange, handleAddMeterPoint, handleRemoveMeterPoint, 
    setFormData, isUniqueMeterNumber, minChangeDate, handleStorageSelect
}) => {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-[#2b2d33] mb-3">
                    Gewünschter Wechseltermin*
                    <InfoIcon content={<span>Der Lieferbeginn erfolgt an dem nach den Marktregeln frühestmöglichen Zeitpunkt.</span>} />
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
                    <FormRadio name="changeDateType" value="asap" checked={formData.changeDateType === 'asap'} onChange={handleChange} onInvalid={handleInvalid} label="Ehestmöglich" />
                    <FormRadio name="changeDateType" value="custom" checked={formData.changeDateType === 'custom'} onChange={handleChange} onInvalid={handleInvalid} label="Wunschtermin" />
                    <FormRadio name="changeDateType" value="movein" checked={formData.changeDateType === 'movein'} onChange={handleChange} onInvalid={handleInvalid} label="Neueinzug" />
                </div>
                {(formData.changeDateType === 'custom' || formData.changeDateType === 'movein') && (
                    <div className="mt-4">
                        <label className={labelClasses}>{formData.changeDateType === 'movein' ? 'Einzugsdatum' : 'Gewünschtes Datum'}</label>
                        <input type="date" name="customChangeDate" value={formData.customChangeDate} onChange={handleChange} onInvalid={handleInvalid} min={minChangeDate} className={`${getInputClass('dob', formData.customChangeDate)} md:w-1/2`} />
                        <p className="text-xs text-gray-500 mt-1">Bitte wählen Sie ein Datum, das mindestens 10 Werktage in der Zukunft liegt.</p>
                    </div>
                )}
            </div>

            <FormSelect 
                label="Ihr bisheriger Energieanbieter" 
                id="previousProvider" name="previousProvider" value={formData.previousProvider} onChange={handleChange} onInvalid={handleInvalid} 
                required={formData.changeDateType !== 'movein'} disabled={formData.changeDateType === 'movein'} 
                options={austrianProviders} validationType="text" 
            />

            <div>
                <FormInput label="Wie hoch ist Ihr aktueller Stromverbrauch?" id="consumption" name="consumption" value={formData.consumption} onChange={handleChange} onInvalid={handleInvalid} required max="50000" validationType="text" type="number" inputMode="numeric" className="pr-14">
                    <span className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-500 font-medium">kWh</span>
                </FormInput>
                <div className="flex flex-wrap gap-2 mt-3">
                    {consumptionEstimates.map((est) => (
                        <button key={est.value} type="button" onClick={() => setFormData(prev => ({ ...prev, consumption: est.value }))} className={`text-xs py-1.5 px-3 rounded-full border transition-colors font-medium ${formData.consumption === est.value ? 'bg-raiffeisen-green text-white border-raiffeisen-green shadow-md' : 'bg-white text-gray-600 border-gray-300 hover:border-raiffeisen-green hover:text-raiffeisen-green'}`}>{est.label} (~{est.value} kWh)</button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-[#2b2d33] mb-2">Geben Sie Ihre Zählpunktnummer an* <InfoIcon content="Diese Information finden Sie auf Ihrer letzten Stromrechnung."/></label>
                <div className="space-y-4">
                    {formData.consumptionMeterPoints.map((point, index) => (
                        <div key={point.id} className="relative p-6 border border-gray-200 rounded-lg bg-gray-50/30">
                            {formData.consumptionMeterPoints.length > 1 && (
                                <button type="button" onClick={() => handleRemoveMeterPoint('consumptionMeterPoints', point.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600 font-bold text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors" title="Diesen Zählpunkt entfernen">&times;</button>
                            )}
                            <FormInput 
                                label={`Zählpunktnummer ${index + 1}`} id={`consumptionMeterNumber-${index}`} name="meterNumber" value={point.meterNumber} 
                                onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} onInvalid={handleInvalid} 
                                disabled={formData.meterNumberLater} required={!formData.meterNumberLater} pattern={METER_PATTERN} 
                                title="Die Zählpunktnummer muss aus 33 alphanumerischen Zeichen bestehen (AT + 31 Ziffern)." placeholder="0000 0000 0000 0000 0000 0000 000"
                                validationType="meterNumber" inputClassName="pl-12 font-mono"
                            >
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none font-bold text-gray-500">AT</div>
                                {isValid('meterNumber', point.meterNumber) && isUniqueMeterNumber(point.meterNumber, point.id) && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"><CheckCircleIcon className="w-5 h-5" /></div>}
                            </FormInput>

                            <div className="mt-3">
                                <label className="flex items-center gap-2 cursor-pointer text-sm">
                                    <input type="checkbox" name="addressDifferent" checked={point.addressDifferent} onChange={(e) => handleMeterPointChange('consumptionMeterPoints', index, e)} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" />
                                    Lieferadresse weicht von der Rechnungsadresse ab
                                </label>
                            </div>
                            {point.addressDifferent && (
                                <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                                    <FormInput label="Straße" id={`consumptionStreetName-${index}`} name="streetName" value={point.streetName} onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="text" />
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <FormInput label="Hausnr." id={`consumptionHouseNumber-${index}`} name="houseNumber" value={point.houseNumber} onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="houseNumber" />
                                        <FormInput label="Zusatz" id={`consumptionAddition-${index}`} name="addition" value={point.addition} onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} validationType="text" />
                                        <FormInput label="Stiege" id={`consumptionStiege-${index}`} name="stiege" value={point.stiege} onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} validationType="text" />
                                        <FormInput label="Top" id={`consumptionTopNumber-${index}`} name="topNumber" value={point.topNumber} onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} validationType="text" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput label="PLZ" id={`consumptionZip-${index}`} name="zip" value={point.zip} onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="zip" maxLength={4} pattern="\d{4}" inputMode="numeric" />
                                        <FormInput label="Ort" id={`consumptionCity-${index}`} name="city" value={point.city} onChange={(e: any) => handleMeterPointChange('consumptionMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="text" />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="checkbox" name="meterNumberLater" checked={formData.meterNumberLater} onChange={handleChange} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" /> Trage ich später nach
                    </label>
                    {formData.consumptionMeterPoints.length < 3 && (
                        <button type="button" onClick={() => handleAddMeterPoint('consumptionMeterPoints')} className="text-sm font-bold text-raiffeisen-green hover:underline flex items-center gap-1"><span className="text-lg">+</span> Weiteren Zählpunkt</button>
                    )}
                </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-bold text-[#2b2d33] mb-3">Besitzen Sie eine Solaranlage und wollen über den Raiffeisen WirStrom auch einspeisen?*</label>
                <div className="flex items-center gap-6">
                    <FormRadio name="isProducer" value="yes" checked={formData.isProducer === 'yes'} onChange={handleChange} onInvalid={handleInvalid} label="Ja" />
                    <FormRadio name="isProducer" value="no" checked={formData.isProducer === 'no'} onChange={handleChange} onInvalid={handleInvalid} label="Nein" />
                </div>
                <p className="text-xs text-gray-500 mt-2 bg-yellow-50 p-2 border border-yellow-100 rounded"><span className="font-bold">Achtung:</span> Oftmals wird beim Wechsel des Energieversorgers auch der Einspeisetarif mit gekündigt. Wir empfehlen daher Besitzern von Solaranlagen sowohl ihren Bezug als auch ihre Einspeisung auf Raiffeisen WirStrom umzustellen.</p>
            </div>

            {formData.isProducer === 'yes' && (
                <fieldset className="border-t border-gray-200 pt-6 mt-6 space-y-6">
                    <legend className="text-lg font-bold text-[#2b2d33] -mt-9 pr-4 bg-white inline-block">Angaben zur Einspeisung</legend>
                    <div>
                        <label className="block text-sm font-bold text-[#2b2d33] mb-2">Geben Sie Ihre Einspeise-Zählpunktnummer(n) an* <InfoIcon content="Diese Information finden Sie auf Ihrer letzten Stromrechnung."/></label>
                        <div className="space-y-4">
                            {formData.einspeiseMeterPoints.map((point, index) => (
                                <div key={point.id} className="p-6 border border-gray-200 rounded-lg relative bg-gray-50/30">
                                    {formData.einspeiseMeterPoints.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveMeterPoint('einspeiseMeterPoints', point.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600 font-bold text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors" title="Diesen Zählpunkt entfernen">&times;</button>
                                    )}
                                    <FormInput 
                                        label={`Einspeisezählpunkt ${index + 1}`} id={`einspeiseMeterNumber-${index}`} name="meterNumber" value={point.meterNumber} 
                                        onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} onInvalid={handleInvalid} 
                                        disabled={formData.einspeiseMeterNumberLater} required={!formData.einspeiseMeterNumberLater} pattern={METER_PATTERN} 
                                        title="Die Zählpunktnummer muss aus 33 alphanumerischen Zeichen bestehen (AT + 31 Ziffern)." placeholder="0000 0000 0000 0000 0000 0000 000"
                                        validationType="meterNumber" inputClassName="pl-12 font-mono"
                                    >
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none font-bold text-gray-500">AT</div>
                                        {isValid('meterNumber', point.meterNumber) && isUniqueMeterNumber(point.meterNumber, point.id) && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"><CheckCircleIcon className="w-5 h-5" /></div>}
                                    </FormInput>

                                    <FormSelect label="Derzeitiger Einspeise-Vergütungs-Partner" id={`einspeiseProvider-${index}`} name="previousProvider" value={point.previousProvider} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} options={austrianProviders} className="mt-4" />
                                    
                                    <FormInput label="Anlagengröße in kWp (gerundet auf die nächste volle Zahl)" id={`kwp-${index}`} name="kwp" value={point.kwp} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} onInvalid={handleInvalid} required max="50" step="1" placeholder="z.B. 8" validationType="text" type="number" className="mt-4 pr-16">
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">kWp</span>
                                    </FormInput>

                                    {formData.customerType === 'business' && (
                                        <div className="mt-3"><label className="flex items-center gap-2 cursor-pointer text-sm font-bold"><input type="checkbox" name="isVatLiable" checked={point.isVatLiable || false} onChange={(e) => handleMeterPointChange('einspeiseMeterPoints', index, e)} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" /> USt. Pflichtig</label></div>
                                    )}

                                    <div className="mt-3">
                                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                                            <input type="checkbox" name="addressDifferent" checked={point.addressDifferent} onChange={(e) => handleMeterPointChange('einspeiseMeterPoints', index, e)} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" />
                                            Adresse weicht von der Verbrauchsadresse ab
                                        </label>
                                    </div>
                                    {point.addressDifferent && (
                                        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                                            <FormInput label="Straße" id={`einspeiseStreetName-${index}`} name="streetName" value={point.streetName} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="text" />
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <FormInput label="Hausnr." id={`einspeiseHouseNumber-${index}`} name="houseNumber" value={point.houseNumber} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="houseNumber" />
                                                <FormInput label="Zusatz" id={`einspeiseAddition-${index}`} name="addition" value={point.addition} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} validationType="text" />
                                                <FormInput label="Stiege" id={`einspeiseStiege-${index}`} name="stiege" value={point.stiege} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} validationType="text" />
                                                <FormInput label="Top" id={`einspeiseTopNumber-${index}`} name="topNumber" value={point.topNumber} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} validationType="text" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormInput label="PLZ" id={`einspeiseZip-${index}`} name="zip" value={point.zip} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="zip" maxLength={4} pattern="\d{4}" inputMode="numeric" />
                                                <FormInput label="Ort" id={`einspeiseCity-${index}`} name="city" value={point.city} onChange={(e: any) => handleMeterPointChange('einspeiseMeterPoints', index, e)} onInvalid={handleInvalid} required validationType="text" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                            <label className="flex items-center gap-2 cursor-pointer text-sm">
                                <input type="checkbox" name="einspeiseMeterNumberLater" checked={formData.einspeiseMeterNumberLater} onChange={handleChange} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" /> Trage ich später nach
                            </label>
                            {formData.einspeiseMeterPoints.length < 3 && (
                                <button type="button" onClick={() => handleAddMeterPoint('einspeiseMeterPoints')} className="text-sm font-bold text-raiffeisen-green hover:underline flex items-center gap-1"><span className="text-lg">+</span> Weiteren Zählpunkt</button>
                            )}
                        </div>
                    </div>
                </fieldset>
            )}

            <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-bold text-[#2b2d33] mb-3">Besitzen Sie einen Speicher?*</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-3">
                    <FormRadio name="storage" value="yes" checked={formData.storage === 'yes'} onChange={handleChange} onInvalid={handleInvalid} label="Ja" />
                    <FormRadio name="storage" value="no" checked={formData.storage === 'no' || formData.storage === 'offer'} onChange={handleChange} onInvalid={handleInvalid} label="Nein" />
                </div>
                {(formData.storage === 'no' || formData.storage === 'offer') && (
                    <div className="mt-2 ml-1">
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-[#2b2d33] bg-gray-50 p-2 rounded border border-gray-200 w-fit hover:bg-gray-100 transition-colors">
                            <input type="checkbox" checked={formData.storage === 'offer'} onChange={(e) => { const val = e.target.checked ? 'offer' : 'no'; handleStorageSelect(val); }} className="w-4 h-4 accent-raiffeisen-green border border-gray-300 rounded bg-white" />
                            <span className="font-medium">Ich möchte ein unverbindliches Speicherangebot erhalten mit 10% dauerhaften Rabatt auf den Arbeitspreis</span>
                        </label>
                    </div>
                )}
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200 mt-6">
                <div className="grid gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-start gap-3 hover:border-raiffeisen-green/50 transition-colors">
                        <input type="checkbox" name="consentGeneralPowerOfAttorney" checked={formData.consentGeneralPowerOfAttorney} onChange={handleChange} onInvalid={handleInvalid} required className="mt-1 w-5 h-5 accent-raiffeisen-green shrink-0 border-gray-300 rounded border bg-white" />
                        <div className="text-sm text-gray-700 w-full">
                            <div className="font-bold text-[#2b2d33]">Vollmacht zur Kündigung & Neuanmeldung*</div>
                            <details className="mt-1 group">
                                <summary className="text-raiffeisen-green cursor-pointer text-xs font-semibold hover:underline list-none flex items-center gap-1">
                                    <span>Details anzeigen</span>
                                    <ChevronDownIcon className="w-3 h-3 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="mt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2"><ConsentGeneralPowerOfAttorney /></div>
                            </details>
                        </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-start gap-3 hover:border-raiffeisen-green/50 transition-colors">
                        <input type="checkbox" name="consentMaxenergyPowerOfAttorney" checked={formData.consentMaxenergyPowerOfAttorney} onChange={handleChange} onInvalid={handleInvalid} required className="mt-1 w-5 h-5 accent-raiffeisen-green shrink-0 border-gray-300 rounded border bg-white" />
                        <div className="text-sm text-gray-700 w-full">
                            <div className="font-bold text-[#2b2d33]">Vollmacht Marktkommunikation & Datenabfrage*</div>
                            <details className="mt-1 group">
                                <summary className="text-raiffeisen-green cursor-pointer text-xs font-semibold hover:underline list-none flex items-center gap-1">
                                    <span>Details anzeigen</span>
                                    <ChevronDownIcon className="w-3 h-3 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="mt-2 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-2 whitespace-pre-wrap"><ConsentMaxenergyPowerOfAttorney /></div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
