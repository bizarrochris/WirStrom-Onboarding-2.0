
import React from 'react';
import { ChevronDownIcon, CheckCircleIcon } from '../../common/Icons';
import { RegistrationFormData } from '../RegistrationTypes';
import { europeanPrefixes } from '../RegistrationConfig';
import { FormInput, FormSelect, FormRadio, getInputClass, labelClasses, isValid } from '../SharedComponents';

interface Props {
    formData: RegistrationFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleInvalid: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handlePhoneInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxDobDate: string;
}

export const StepPersonal: React.FC<Props> = ({ formData, handleChange, handleInvalid, handlePhoneInput, maxDobDate }) => (
    <div className="space-y-6">
        <div>
            <label className="block text-sm font-bold text-[#2b2d33] mb-3">Ich bin*</label>
            <div className="flex items-center gap-6">
                <FormRadio name="customerType" value="private" checked={formData.customerType === 'private'} onChange={handleChange} onInvalid={handleInvalid} label="Privatkunde" />
                <FormRadio name="customerType" value="business" checked={formData.customerType === 'business'} onChange={handleChange} onInvalid={handleInvalid} label="Geschäftskunde" />
            </div>
        </div>

        <FormSelect label="Anrede" id="salutation" name="salutation" value={formData.salutation} onChange={handleChange} onInvalid={handleInvalid} required options={['Frau', 'Herr']} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Vorname" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} onInvalid={handleInvalid} required validationType="name" />
            <FormInput label="Nachname" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} onInvalid={handleInvalid} required validationType="name" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="phone" className={labelClasses}>Telefonnummer*</label>
                <div className="flex relative">
                    <div className="relative">
                        <select name="phonePrefix" value={formData.phonePrefix} onChange={handleChange} className="h-full bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg py-3.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-raiffeisen-green focus:border-raiffeisen-green transition-shadow appearance-none text-gray-700 font-medium w-[110px]">
                            {europeanPrefixes.map(p => <option key={p.country} value={p.code}>{p.country} {p.code}</option>)}
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><ChevronDownIcon className="w-4 h-4" /></div>
                    </div>
                    <input type="tel" inputMode="tel" id="phone" name="phone" value={formData.phone} onChange={handlePhoneInput} onInvalid={handleInvalid} required className={`${getInputClass('phone', formData.phone)} rounded-l-none border-l-0`} placeholder="664 1234567" />
                    {isValid('phone', formData.phone) && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none"><CheckCircleIcon className="w-5 h-5" /></div>}
                </div>
            </div>

            {formData.customerType === 'private' && (
                <FormInput label="Geburtsdatum" id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} onInvalid={handleInvalid} required max={maxDobDate} validationType="dob" />
            )}
        </div>
        
        {formData.customerType === 'business' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Firmenname" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} onInvalid={handleInvalid} required validationType="text" />
                <FormInput label="UID-Nummer" id="uid" name="uid" value={formData.uid} onChange={handleChange} onInvalid={handleInvalid} required validationType="text" />
            </div>
        )}

        <FormInput label="Straße" id="streetName" name="streetName" value={formData.streetName} onChange={handleChange} onInvalid={handleInvalid} required validationType="text" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <FormInput label="Hausnr." id="houseNumber" name="houseNumber" value={formData.houseNumber} onChange={handleChange} onInvalid={handleInvalid} required validationType="houseNumber" />
            <FormInput label="Zusatz" id="addition" name="addition" value={formData.addition} onChange={handleChange} validationType="text" />
            <FormInput label="Stiege" id="stiege" name="stiege" value={formData.stiege} onChange={handleChange} validationType="text" />
            <FormInput label="Top" id="topNumber" name="topNumber" value={formData.topNumber} onChange={handleChange} validationType="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="PLZ" id="zip" name="zip" value={formData.zip} onChange={handleChange} onInvalid={handleInvalid} required validationType="zip" maxLength={4} pattern="\d{4}" title="Bitte geben Sie eine 4-stellige PLZ ein" inputMode="numeric" />
            <FormInput label="Ort" id="city" name="city" value={formData.city} onChange={handleChange} onInvalid={handleInvalid} required validationType="text" />
        </div>

        <div className="pt-6 border-t border-gray-200">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold mb-4">
                <input type="checkbox" name="hasSecondPartner" checked={formData.hasSecondPartner} onChange={handleChange} className="w-5 h-5 accent-raiffeisen-green border border-gray-300 rounded bg-white" />
                Zweiten Vertragspartner hinzufügen
            </label>

            {formData.hasSecondPartner && (
                <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <FormSelect label="Anrede (2. Partner)" id="secondPartnerSalutation" name="secondPartnerSalutation" value={formData.secondPartnerSalutation} onChange={handleChange} onInvalid={handleInvalid} required options={['Frau', 'Herr']} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Vorname (2. Partner)" id="secondPartnerFirstName" name="secondPartnerFirstName" value={formData.secondPartnerFirstName} onChange={handleChange} onInvalid={handleInvalid} required validationType="name" />
                        <FormInput label="Nachname (2. Partner)" id="secondPartnerLastName" name="secondPartnerLastName" value={formData.secondPartnerLastName} onChange={handleChange} onInvalid={handleInvalid} required validationType="name" />
                    </div>
                    <FormInput label="Geburtsdatum (2. Partner)" id="secondPartnerDob" name="secondPartnerDob" type="date" value={formData.secondPartnerDob} onChange={handleChange} onInvalid={handleInvalid} required max={maxDobDate} validationType="dob" />
                </div>
            )}
        </div>
    </div>
);
