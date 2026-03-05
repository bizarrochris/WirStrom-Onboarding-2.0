
import React, { useState, useRef } from 'react';
import { RegistrationFormData, MeterPoint } from './RegistrationTypes';
import { EMPTY_STATE, zipCityMapping } from './RegistrationConfig';
import { formatChunked, isValidIban } from './RegistrationUtils';

export const useRegistration = (
    setIsProducer: (val: string) => void,
    setStorageOption: (val: string) => void,
    setZipCode: (val: string) => void
) => {
    const [formStage, setFormStage] = useState<'lead' | 'otp' | 'details' | 'completion'>('lead');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<RegistrationFormData>(EMPTY_STATE);
    const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
    const [otpError, setOtpError] = useState<string | null>(null);
    const otpInputs = useRef<(HTMLInputElement | null)[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    // --- Scenario Loading ---
    const loadScenario = (type: string) => {
        let newData = { ...EMPTY_STATE };
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 30);
        const futureDateStr = futureDate.toISOString().split('T')[0];

        const commonPrivate = {
            salutation: 'Frau', firstName: 'Anna', lastName: 'Mustermann', email: 'anna.mustermann@example.com',
            phone: '6641234567', phonePrefix: '+43', dob: '1990-01-01',
            zip: '1010', city: 'Wien', streetName: 'Stephansplatz', houseNumber: '1',
            iban: formatChunked('AT611904300234573201'), accountHolder: 'Anna Mustermann', isAccountHolderSame: true,
            consentAGB: true, consentCommunication: true, consentGeneralPowerOfAttorney: true, consentMarketing: true, consentMaxenergyPowerOfAttorney: true, consentPriceSheet: true, consentSepaDirectDebit: true
        };

        const commonBusiness = {
            customerType: 'business', companyName: 'Musterfirma GmbH', uid: 'ATU12345678',
            salutation: 'Herr', firstName: 'Max', lastName: 'Geschäftsführer', email: 'office@musterfirma.at',
            phone: '12345678', phonePrefix: '+43',
            zip: '4020', city: 'Linz', streetName: 'Industriezeile', houseNumber: '10',
            iban: formatChunked('AT483200000012345864'), accountHolder: 'Musterfirma GmbH', isAccountHolderSame: false,
            consentAGB: true, consentCommunication: true, consentGeneralPowerOfAttorney: true, consentMarketing: true, consentMaxenergyPowerOfAttorney: true, consentPriceSheet: true, consentSepaDirectDebit: true
        };
        
        switch(type) {
            case 'P1': // Privat Simple
                newData = { ...newData, ...commonPrivate, changeDateType: 'asap', previousProvider: 'Wien Energie', consumption: '2500', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }] as any }; break;
            case 'P2': // Privat Complex
                newData = { ...newData, ...commonPrivate, hasSecondPartner: true, secondPartnerSalutation: 'Herr', secondPartnerFirstName: 'Peter', secondPartnerLastName: 'Mustermann', secondPartnerDob: '1988-05-20', changeDateType: 'movein', customChangeDate: futureDateStr, consumption: '4500', isProducer: 'yes', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }, { id: 2, meterNumber: formatChunked('0030000000000000000001000000002'), addressDifferent: true, zip: '1020', city: 'Wien', streetName: 'Praterstraße', houseNumber: '5' }] as any, einspeiseMeterPoints: [{ id: 3, meterNumber: formatChunked('0030000000000000000001000000003'), kwp: '5', addressDifferent: false, previousProvider: 'Wien Energie' }, { id: 4, meterNumber: formatChunked('0030000000000000000001000000004'), kwp: '10', addressDifferent: true, zip: '7000', city: 'Wien', streetName: 'Praterstraße', houseNumber: '5', previousProvider: 'Wien Energie' }] as any }; break;
            case 'P3': // Privat Neubau
                newData = { ...newData, ...commonPrivate, changeDateType: 'movein', customChangeDate: futureDateStr, consumption: '3500', isProducer: 'yes', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }] as any, einspeiseMeterPoints: [{ id: 2, meterNumber: formatChunked('0030000000000000000001000000002'), kwp: '8', addressDifferent: false, previousProvider: 'Wien Energie' }] as any }; break;
            case 'P4': // Privat Nur PV
                newData = { ...newData, ...commonPrivate, changeDateType: 'asap', previousProvider: 'EVN', consumption: '1500', isProducer: 'yes', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }] as any, einspeiseMeterPoints: [{ id: 2, meterNumber: formatChunked('0030000000000000000001000000002'), kwp: '15', addressDifferent: false, previousProvider: 'EVN' }] as any }; break;
            case 'P5': // Privat Umzug Simple
                newData = { ...newData, ...commonPrivate, changeDateType: 'movein', customChangeDate: futureDateStr, consumption: '1500', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }] as any }; break;
            case 'P6': // Privat Complex Eisenstadt (7000)
                newData = { ...newData, ...commonPrivate, zip: '7000', city: 'Eisenstadt', hasSecondPartner: true, secondPartnerSalutation: 'Herr', secondPartnerFirstName: 'Peter', secondPartnerLastName: 'Mustermann', secondPartnerDob: '1988-05-20', changeDateType: 'movein', customChangeDate: futureDateStr, consumption: '4500', isProducer: 'yes', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }, { id: 2, meterNumber: formatChunked('0030000000000000000001000000002'), addressDifferent: true, zip: '7000', city: 'Eisenstadt', streetName: 'Hauptstraße', houseNumber: '5' }] as any, einspeiseMeterPoints: [{ id: 3, meterNumber: formatChunked('0030000000000000000001000000003'), kwp: '5', addressDifferent: false, previousProvider: 'Wien Energie' }, { id: 4, meterNumber: formatChunked('0030000000000000000001000000004'), kwp: '10', addressDifferent: true, zip: '7000', city: 'Eisenstadt', streetName: 'Hauptstraße', houseNumber: '5', previousProvider: 'Wien Energie' }] as any }; break;
            case 'P7': // Privat PV Mistelbach (2130)
                newData = { ...newData, ...commonPrivate, zip: '2130', city: 'Mistelbach', changeDateType: 'asap', previousProvider: 'EVN', consumption: '1500', isProducer: 'yes', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }] as any, einspeiseMeterPoints: [{ id: 2, meterNumber: formatChunked('0030000000000000000001000000002'), kwp: '15', addressDifferent: false, previousProvider: 'EVN' }] as any }; break;
            case 'P8': // Privat Eisenstadt Wunschdatum
                newData = { ...newData, ...commonPrivate, zip: '7000', city: 'Eisenstadt', changeDateType: 'custom', customChangeDate: futureDateStr, consumption: '3000', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0030000000000000000001000000001'), addressDifferent: false }] as any }; break;
            case 'G1': // Gewerbe Standard
                newData = { ...newData, ...commonBusiness, changeDateType: 'custom', customChangeDate: futureDateStr, previousProvider: 'Energie AG', consumption: '12000', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0040000000000000000005555555555'), addressDifferent: false }] as any }; break;
            case 'G2': // Gewerbe Neubau
                newData = { ...newData, ...commonBusiness, changeDateType: 'movein', customChangeDate: futureDateStr, consumption: '25000', isProducer: 'yes', consumptionMeterPoints: [{ id: 1, meterNumber: formatChunked('0040000000000000000005555555555'), addressDifferent: false }] as any, einspeiseMeterPoints: [{ id: 2, meterNumber: formatChunked('0040000000000000000006666666666'), kwp: '45', isVatLiable: true, addressDifferent: false, previousProvider: 'Energie AG' }] as any }; break;
        }
        
        setFormData(newData);
        setIsProducer(newData.isProducer);
        setStorageOption(newData.storage);
        setZipCode(newData.zip);
    };

    // --- Validation ---
    const handleInvalid = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        if (target.validity.valueMissing) {
            if (target.type === 'checkbox') target.setCustomValidity("Bitte bestätigen Sie dieses Feld.");
            else if (target.type === 'radio') target.setCustomValidity("Bitte wählen Sie eine Option.");
            else target.setCustomValidity("Bitte füllen Sie dieses Feld aus.");
        } else if (target.validity.typeMismatch) {
             if (target.type === 'email') target.setCustomValidity("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        } else if (target.validity.patternMismatch) {
            if (target.name === 'zip' || target.name === 'leadZip' || target.name === 'zipCode') target.setCustomValidity("Bitte geben Sie eine 4-stellige PLZ ein.");
            else if (target.name === 'iban') target.setCustomValidity("Das Format der IBAN ist ungültig.");
            else if (target.name === 'meterNumber') target.setCustomValidity("Die Zählpunktnummer muss aus 31 alphanumerischen Zeichen bestehen (ohne AT).");
            else if (target.name === 'kwp') target.setCustomValidity("Bitte geben Sie nur Zahlen ein.");
            else target.setCustomValidity("Ungültiges Format.");
        } else if (target.validity.rangeOverflow) {
            const max = target.getAttribute("max");
            target.setCustomValidity(`Der Wert darf maximal ${max} sein.`);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.target.setCustomValidity("");
        const { name, value, type } = e.target;
        let processedValue = value;

        if (name === 'zip' || name === 'leadZip') processedValue = value.replace(/\D/g, '').slice(0, 4);
        else if (name === 'phone') processedValue = value.replace(/\D/g, '');
        else if (name === 'iban') processedValue = formatChunked(value).toUpperCase().slice(0, 40); 
        else if (name === 'uid') processedValue = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
        else if (['firstName', 'lastName', 'secondPartnerFirstName', 'secondPartnerLastName'].includes(name)) processedValue = value.replace(/\d/g, '');
        else if (name === 'houseNumber') { if (!/^\d*$/.test(value)) return; processedValue = value; }
        else if (name === 'consumption') { processedValue = value.replace(/\D/g, ''); if (processedValue !== '' && parseInt(processedValue) > 50000) processedValue = '50000'; }

        if (name === 'isProducer') setIsProducer(value);
        if (name === 'storage') setStorageOption(value);
        if (name === 'zip') {
            setZipCode(processedValue);
            if (processedValue in zipCityMapping) setFormData(prev => ({ ...prev, city: zipCityMapping[processedValue] }));
        }

        if (name === 'previousProvider') {
            setFormData(prev => ({ ...prev, previousProvider: processedValue, einspeiseMeterPoints: prev.einspeiseMeterPoints.map(p => ({ ...p, previousProvider: processedValue })) }));
            return;
        }

        if (type === 'checkbox') setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        else setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    // Specific handler to update storage option from the offer checkbox
    const handleStorageSelect = (val: string) => {
        setStorageOption(val);
        setFormData(prev => ({ ...prev, storage: val }));
    };

    const handleMeterPointChange = (arrayName: 'consumptionMeterPoints' | 'einspeiseMeterPoints', index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.target.setCustomValidity("");
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        const updatedMeterPoints = formData[arrayName].map((point, i) => {
            if (i === index) {
                const updatedPoint = { ...point };
                 if (type === 'checkbox') (updatedPoint as any)[name] = checked;
                else if (name === 'meterNumber') {
                    let raw = value.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
                    if (raw.startsWith('AT')) raw = raw.slice(2);
                    raw = raw.slice(0, 31);
                    const formatted = formatChunked(raw);
                    
                    const cleanNewValue = formatted.replace(/\s+/g, '').toUpperCase();
                    if (cleanNewValue.length > 0) {
                        const allOtherPoints = [...formData.consumptionMeterPoints, ...formData.einspeiseMeterPoints].filter(p => p.id !== point.id);
                        if (allOtherPoints.some(p => p.meterNumber.replace(/\s+/g, '').toUpperCase() === cleanNewValue)) e.target.setCustomValidity("Diese Zählpunktnummer wurde bereits verwendet.");
                        else e.target.setCustomValidity("");
                    } else e.target.setCustomValidity("");
                    updatedPoint.meterNumber = formatted;
                } else if (name === 'kwp') {
                    let val = value.replace(/\D/g, '');
                    if (val !== '' && parseInt(val) > 50) val = '50';
                    updatedPoint.kwp = val;
                } else if (name === 'houseNumber') { if (!/^\d*$/.test(value)) return point; (updatedPoint as any)[name] = value; }
                else if (name === 'zip') {
                    const cleanZip = value.replace(/\D/g, '').slice(0, 4);
                    updatedPoint.zip = cleanZip;
                    if (cleanZip in zipCityMapping) updatedPoint.city = zipCityMapping[cleanZip];
                } else (updatedPoint as any)[name] = value;
                return updatedPoint;
            }
            return point;
        });
        setFormData(prev => ({ ...prev, [arrayName]: updatedMeterPoints }));
    };

    const handleAddMeterPoint = (arrayName: 'consumptionMeterPoints' | 'einspeiseMeterPoints') => {
        if (formData[arrayName].length >= 3) return;
        const newPoint: MeterPoint = { id: Date.now(), meterNumber: '', addressDifferent: false, streetName: '', houseNumber: '', addition: '', stiege: '', topNumber: '', zip: '', city: '' };
        if (arrayName === 'einspeiseMeterPoints') { newPoint.kwp = ''; newPoint.isVatLiable = false; newPoint.previousProvider = formData.previousProvider; }
        setFormData(prev => ({ ...prev, [arrayName]: [...prev[arrayName], newPoint] }));
    };

    const handleRemoveMeterPoint = (arrayName: 'consumptionMeterPoints' | 'einspeiseMeterPoints', idToRemove: number) => {
        setFormData(prev => ({ ...prev, [arrayName]: prev[arrayName].filter(mp => mp.id !== idToRemove) }));
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otpCode.join('').length === 6) setFormStage('details');
        else setOtpError("Bitte geben Sie den vollständigen 6-stelligen Code ein.");
    };

    const handleFinalSubmit = () => {
        if (!formData.meterNumberLater) {
            for (const p of formData.consumptionMeterPoints) {
                if (p.meterNumber.replace(/\s+/g, '').length !== 31) { alert("Bitte überprüfen Sie die Zählpunktnummern. Sie müssen genau 31 Ziffern lang sein (ohne AT)."); return; }
            }
        }
        if (formData.isProducer === 'yes' && !formData.einspeiseMeterNumberLater) {
             for (const p of formData.einspeiseMeterPoints) {
                if (p.meterNumber.replace(/\s+/g, '').length !== 31) { alert("Bitte überprüfen Sie die Einspeise-Zählpunktnummern. Sie müssen genau 31 Ziffern lang sein (ohne AT)."); return; }
            }
        }
        if (!formRef.current?.checkValidity()) { formRef.current?.reportValidity(); return; }
        if (!isValidIban(formData.iban)) {
            const el = document.getElementById('iban') as HTMLInputElement;
            if (el) { el.setCustomValidity("IBAN ist ungültig (Prüfsumme oder Format fehlerhaft)."); el.reportValidity(); }
            return;
        }
        const allPoints = [...formData.consumptionMeterPoints, ...formData.einspeiseMeterPoints];
        const uniqueValues = new Set(allPoints.map(p => p.meterNumber.replace(/\s+/g, '').toUpperCase()).filter(s => s.length > 0));
        const validCount = allPoints.filter(p => p.meterNumber.replace(/\s+/g, '').length > 0).length;
        if (uniqueValues.size !== validCount) { alert("Fehler: Doppelte Zählpunktnummern erkannt."); return; }

        setFormStage('completion');
    };

    return {
        formStage, setFormStage,
        step, setStep,
        formData, setFormData,
        otpCode, setOtpCode,
        otpError, setOtpError,
        otpInputs, formRef,
        handleInvalid, handleChange, handleMeterPointChange,
        handleAddMeterPoint, handleRemoveMeterPoint,
        handleOtpSubmit, handleFinalSubmit, loadScenario,
        handleStorageSelect
    };
};
