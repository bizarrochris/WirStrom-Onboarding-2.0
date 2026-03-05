
import React, { useState } from 'react';
import { Button } from './common/Button';
import { SparklesIcon } from './common/Icons';
import { useRegistration } from './registration/useRegistration';
import { SHOW_DEV_TOOLS } from './registration/RegistrationConfig';
import { ProgressIndicator } from './registration/SharedComponents';
import { StepLead } from './registration/steps/StepLead';
import { StepOtp } from './registration/steps/StepOtp';
import { StepPersonal } from './registration/steps/StepPersonal';
import { StepTariff } from './registration/steps/StepTariff';
import { StepPayment } from './registration/steps/StepPayment';
import { StepCompletion } from './registration/steps/StepCompletion';
import { jsPDF } from 'jspdf';

export const RegistrationForm: React.FC<{ 
    setIsProducer: (value: string) => void, 
    setStorageOption: (value: string) => void, 
    setZipCode: (value: string) => void 
}> = ({ setIsProducer, setStorageOption, setZipCode }) => {
    
    const {
        formStage, setFormStage, step, setStep, formData, setFormData,
        otpCode, setOtpCode, otpError, setOtpError, otpInputs, formRef,
        handleInvalid, handleChange, handleMeterPointChange, handleAddMeterPoint, handleRemoveMeterPoint,
        handleOtpSubmit, handleFinalSubmit, loadScenario, handleStorageSelect
    } = useRegistration(setIsProducer, setStorageOption, setZipCode);
    
    const [selectedScenario, setSelectedScenario] = useState<string>('P1');

    // Re-implementing specific UI logic like IbanBlur which sets validity
    const handleIbanBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length > 0) {
            const clean = val.replace(/\s+/g, "").toUpperCase();
            if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/.test(clean)) e.target.setCustomValidity("Das Format der IBAN ist ungültig (z.B. AT...).");
            else if (clean.length > 0) {
                // simple check, real check is in isValidIban
                 e.target.setCustomValidity(""); 
            }
            e.target.reportValidity();
        }
    };

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e);
    
    const nextStep = () => { if (formRef.current?.checkValidity()) setStep(s => (s < 3 ? s + 1 : s)); else formRef.current?.reportValidity(); };
    const prevStep = () => setStep(s => (s > 1 ? s - 1 : s));
    
    // API Payload Generator
    const generateApiPayloads = () => {
         const payloads: { type: string; id: string; data: any }[] = [];
         
         const RATE_ID_CONSUMER = "2033"; const RATE_ID_PRODUCER = "2034"; const VP_CLIENT_ID = "5259"; const NETWORK_OPERATOR = "Netz NÖ";
         const standardAddress = { zipcode: formData.zip, city: formData.city, street_name: formData.streetName, street_number: formData.houseNumber, email: formData.email, phone_number: formData.phonePrefix + formData.phone };
         const bankData = { account_iban: formData.iban.replace(/\s/g, ''), authorize_debit: 1, account_holder: formData.isAccountHolderSame ? `${formData.firstName} ${formData.lastName}` : formData.accountHolder, bank_name: "Bank Austria" };
         const agreementData = { agb: formData.consentGeneralPowerOfAttorney ? 1 : 0, price_sheet_read: 1, consent_of_data_storage: formData.consentCommunication ? 1 : 0, switch_mandate: formData.consentMaxenergyPowerOfAttorney ? 1 : 0 };
         const privateData = { first_name: formData.firstName, last_name: formData.lastName, suffix: formData.salutation, birthday: formData.dob };
         const secondPartnerData = formData.hasSecondPartner ? { first_name: formData.secondPartnerFirstName, last_name: formData.secondPartnerLastName, suffix: formData.secondPartnerSalutation, birthday: formData.secondPartnerDob } : null;
         
         let startDeliveryDate = ""; let startDeliveryNextPossible = "1";
         if (formData.changeDateType === 'custom' || formData.changeDateType === 'movein') { startDeliveryDate = formData.customChangeDate; startDeliveryNextPossible = "0"; } 
         else { const date = new Date(); date.setDate(date.getDate() + 14); startDeliveryDate = date.toISOString().split('T')[0]; startDeliveryNextPossible = "1"; }

         formData.consumptionMeterPoints.forEach((p, idx) => {
            const consumptionAddress = p.addressDifferent ? { zipcode: p.zip, city: p.city, street_name: p.streetName, street_number: p.houseNumber, street_additional_info: "" } : { ...standardAddress, street_additional_info: "" };
            payloads.push({ type: 'VERBRAUCHER', id: `V_${idx + 1}`, data: { client: { ip_address: "1.2.3.4", auth_type: "11", client_type: formData.customerType === 'private' ? "0" : "1", network_operator: NETWORK_OPERATOR, vp_client_extern_id: VP_CLIENT_ID, status: "34" }, tariffData: { sign_date: new Date().toISOString().split('T')[0], tariff_zip: consumptionAddress.zipcode, tariff_city: consumptionAddress.city, previous_volume: formData.consumption || "2500", rate_id: RATE_ID_CONSUMER, tariff_energy_type: "1", nominal_power: "0" }, switchData: { start_delivery_type: "1", start_delivery_next_possible: startDeliveryNextPossible, previous_supplier: formData.previousProvider, counter_id: `AT${p.meterNumber.replace(/\s/g, '')}`, start_delivery: startDeliveryDate }, addressData: standardAddress, privateData, BankData: bankData, AgreementData: agreementData, customFields: { pv_anlage_fertig: "nein", ust_key_pv: "0" }, CommercialData: null, secondContractPartnerPrivateData: secondPartnerData, consumptionAddressData: consumptionAddress } });
         });
         
         if (formData.isProducer === 'yes') {
            formData.einspeiseMeterPoints.forEach((p, idx) => {
                const einspeiseAddress = p.addressDifferent ? { zipcode: p.zip, city: p.city, street_name: p.streetName, street_number: p.houseNumber, street_additional_info: "" } : { ...standardAddress, street_additional_info: "" };
                payloads.push({ type: 'EINSPEISER', id: `E_${idx + 1}`, data: { client: { ip_address: "1.2.3.4", auth_type: "11", client_type: formData.customerType === 'private' ? "0" : "1", network_operator: NETWORK_OPERATOR, vp_client_extern_id: VP_CLIENT_ID, status: "34" }, tariffData: { sign_date: new Date().toISOString().split('T')[0], tariff_zip: einspeiseAddress.zipcode, tariff_city: einspeiseAddress.city, previous_volume: "0", rate_id: RATE_ID_PRODUCER, tariff_energy_type: "4", nominal_power: "0" }, switchData: { start_delivery_type: "1", start_delivery_next_possible: startDeliveryNextPossible, previous_supplier: p.previousProvider || formData.previousProvider, counter_id: `AT${p.meterNumber.replace(/\s/g, '')}`, start_delivery: startDeliveryDate }, addressData: standardAddress, privateData, BankData: bankData, AgreementData: agreementData, customFields: { pv_anlage_fertig: "ja", ust_key_pv: "0" }, CommercialData: null, secondContractPartnerPrivateData: secondPartnerData, consumptionAddressData: einspeiseAddress } });
            });
         }
         return payloads;
    };

    const handlePrintSummary = () => {
        try {
            const doc = new jsPDF();
            const primaryColor = '#2b2d33';
            const secondaryColor = '#66b84d';

            doc.setFontSize(24);
            doc.setTextColor(primaryColor);
            doc.text("Anmeldebestätigung", 20, 25);

            doc.setFontSize(12);
            doc.setTextColor('#666666');
            doc.text("Raiffeisen WirStrom", 20, 32);

            doc.setFontSize(10);
            doc.text(`Datum: ${new Date().toLocaleDateString('de-AT')}`, 150, 25);

            let y = 50;
            
            // Helper functions for PDF generation
            const addSectionTitle = (title: string) => {
                if (y > 260) { doc.addPage(); y = 30; }
                doc.setFontSize(14);
                doc.setTextColor(secondaryColor);
                doc.setFont("helvetica", "bold");
                doc.text(title, 20, y);
                doc.setDrawColor(200, 200, 200);
                doc.line(20, y + 2, 190, y + 2);
                y += 10;
                doc.setFontSize(10);
                doc.setTextColor(primaryColor);
                doc.setFont("helvetica", "normal");
            };

            const addRow = (label: string, value: string) => {
                if (y > 275) { doc.addPage(); y = 30; }
                doc.setFont("helvetica", "bold");
                doc.text(label, 20, y);
                doc.setFont("helvetica", "normal");
                // Check if value is too long
                const splitValue = doc.splitTextToSize(value || '-', 110);
                doc.text(splitValue, 80, y);
                y += (splitValue.length * 5) + 2; 
            };

            const addCheckboxRow = (label: string, checked: boolean) => {
                if (y > 275) { doc.addPage(); y = 30; }
                
                // Draw checkbox
                doc.setDrawColor(primaryColor);
                doc.rect(20, y - 3, 3, 3);
                
                if (checked) {
                    doc.setFont("helvetica", "bold");
                    doc.text("x", 20.5, y - 0.5);
                }
                
                doc.setFont("helvetica", "normal");
                doc.text(label, 30, y);
                y += 6;
            };

            // Section 1: Personal Data
            addSectionTitle("Kundendaten");
            addRow("Name", `${formData.salutation} ${formData.firstName} ${formData.lastName}`);
            if (formData.customerType === 'business') {
                addRow("Firma", formData.companyName);
                addRow("UID-Nummer", formData.uid);
            }
            addRow("Geburtsdatum", formData.dob);
            addRow("Adresse", `${formData.streetName} ${formData.houseNumber}${formData.stiege ? ', Stg. '+formData.stiege : ''}${formData.topNumber ? ', Top '+formData.topNumber : ''}`);
            addRow("PLZ / Ort", `${formData.zip} ${formData.city}`);
            addRow("E-Mail", formData.email);
            addRow("Telefon", `${formData.phonePrefix} ${formData.phone}`);
            
            y += 5;

            // Section 2: Tariff Data
            addSectionTitle("Lieferdaten");
            const changeDateMap: Record<string, string> = { 'asap': 'Ehestmöglich', 'custom': `Wunschtermin: ${formData.customChangeDate}`, 'movein': `Einzug: ${formData.customChangeDate}` };
            addRow("Wechseltermin", changeDateMap[formData.changeDateType] || formData.changeDateType);
            addRow("Bisheriger Anbieter", formData.previousProvider);
            addRow("Jahresverbrauch", `${formData.consumption} kWh`);
            
            if (formData.consumptionMeterPoints.length > 0) {
                y += 5;
                if (y > 275) { doc.addPage(); y = 30; }
                doc.setFont("helvetica", "bold");
                doc.text("Verbrauchs-Zählpunkte:", 20, y);
                y += 6;
                doc.setFont("helvetica", "normal");
                formData.consumptionMeterPoints.forEach((mp, i) => {
                     if (y > 275) { doc.addPage(); y = 30; }
                     const zp = mp.meterNumber.startsWith('AT') ? mp.meterNumber : `AT ${mp.meterNumber}`;
                     const addr = mp.addressDifferent ? `(${mp.zip} ${mp.city}, ${mp.streetName} ${mp.houseNumber})` : '(Lieferadresse = Rechnungsadresse)';
                     doc.text(`ZP ${i+1}: ${zp}`, 20, y);
                     doc.setFontSize(9);
                     doc.setTextColor('#888888');
                     doc.text(addr, 90, y);
                     doc.setFontSize(10);
                     doc.setTextColor(primaryColor);
                     y += 6;
                });
            }

            // Section 3: Einspeisung
            if (formData.isProducer === 'yes') {
                 y += 5;
                 if (y > 275) { doc.addPage(); y = 30; }
                 addSectionTitle("Einspeisung");
                 formData.einspeiseMeterPoints.forEach((mp, i) => {
                     if (y > 275) { doc.addPage(); y = 30; }
                     const zp = mp.meterNumber.startsWith('AT') ? mp.meterNumber : `AT ${mp.meterNumber}`;
                     const details = `${mp.kwp} kWp, ${mp.isVatLiable ? 'USt. pflichtig' : 'Kleinunternehmer'}`;
                     doc.text(`EZP ${i+1}: ${zp}`, 20, y);
                     doc.setFontSize(9);
                     doc.setTextColor('#888888');
                     doc.text(details, 90, y);
                     doc.setFontSize(10);
                     doc.setTextColor(primaryColor);
                     y += 6;
                });
            }

            y += 5;
            // Section 4: Payment
            addSectionTitle("Zahlungsdaten");
            addRow("Zahlungsart", "SEPA-Lastschrift");
            addRow("IBAN", formData.iban);
            addRow("Kontoinhaber", formData.isAccountHolderSame ? "Wie Antragsteller" : formData.accountHolder);

            y += 5;
            // Section 5: Consents
            addSectionTitle("Zustimmungen");
            addCheckboxRow("Elektronische Kommunikation akzeptiert", formData.consentCommunication);
            addCheckboxRow("SEPA-Lastschriftmandat erteilt", formData.consentSepaDirectDebit);
            addCheckboxRow("Vollmacht zur Kündigung & Neuanmeldung", formData.consentGeneralPowerOfAttorney);
            addCheckboxRow("Vollmacht Marktkommunikation & Datenabfrage", formData.consentMaxenergyPowerOfAttorney);
            addCheckboxRow("AGB & Widerrufsbelehrung akzeptiert", formData.consentAGB);
            addCheckboxRow("Preisblatt akzeptiert", formData.consentPriceSheet);
            addCheckboxRow("Einwilligung Marketing & Kontaktaufnahme", formData.consentMarketing);

            doc.save("Raiffeisen_WirStrom_Anmeldung.pdf");
        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Fehler beim Erstellen des PDFs. Bitte versuchen Sie es später erneut.");
        }
    };

    // Derived values
    const today = new Date();
    const maxDobDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const minChangeDateObj = new Date(); minChangeDateObj.setDate(minChangeDateObj.getDate() + 10);
    const minChangeDate = minChangeDateObj.toISOString().split('T')[0];
    
    // Uniqueness check
    const isUniqueMeterNumber = (value: string, currentId: number) => {
        const cleanVal = value.replace(/\s+/g, '').toUpperCase();
        if (cleanVal.length === 0) return true;
        const allPoints = [...formData.consumptionMeterPoints, ...formData.einspeiseMeterPoints];
        return !allPoints.some(p => p.id !== currentId && p.meterNumber.replace(/\s+/g, '').toUpperCase() === cleanVal);
    };

    if (formStage === 'lead') {
        return <StepLead formData={formData} handleChange={handleChange} handleInvalid={handleInvalid} onSubmit={(e) => { e.preventDefault(); if(formRef.current?.checkValidity()) setFormStage('otp'); else formRef.current?.reportValidity(); }} formRef={formRef} />;
    }

    if (formStage === 'otp') {
        return <StepOtp formData={formData} otpCode={otpCode} setOtpCode={setOtpCode} otpError={otpError} setOtpError={setOtpError} otpInputs={otpInputs} onSubmit={handleOtpSubmit} onBack={() => setFormStage('lead')} />;
    }

    if (formStage === 'completion') {
        return <StepCompletion firstName={formData.firstName} payloads={generateApiPayloads()} onPrintSummary={handlePrintSummary} />;
    }

    return (
        <div>
            <div className="bg-white p-6 rounded-lg mb-8 border border-gray-200 border-l-4 border-l-raiffeisen-yellow flex items-start gap-4">
                 <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-raiffeisen-yellow text-black rounded-full text-sm font-bold mt-0.5">✓</div>
                 <div>
                     <h3 className="font-bold text-[#2b2d33] text-lg">Vielen Dank! Ihre Identität wurde bestätigt.</h3>
                     <p className="text-sm text-gray-700 mt-1"><span className="font-bold text-[#2b2d33]">Sollten Sie bereits Mitglied einer Raiffeisen Energiegenossenschaft sein, so wurde der Großteil Ihrer Daten übernommen.</span> Bitte vervollständigen Sie die Daten, um Ihre Anmeldung abzuschließen.</p>
                 </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 relative">
                {SHOW_DEV_TOOLS && (
                    <div className="mb-6 p-3 bg-amber-50 border-l-4 border-amber-400 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
                            <SparklesIcon className="w-4 h-4" />
                            <span>Developer Tools: Load Test Scenario</span>
                        </div>
                        <div className="flex gap-2">
                            <select className="bg-white border border-amber-300 text-amber-900 text-xs rounded focus:ring-amber-500 focus:border-amber-500 block p-1" value={selectedScenario} onChange={(e) => setSelectedScenario(e.target.value)}>
                                <option value="P1">P1: Privat Simple (1V)</option>
                                <option value="P2">P2: Privat Complex (2V+2E, Partner)</option>
                                <option value="P3">P3: Privat Neubau (1V+1E)</option>
                                <option value="P4">P4: Privat PV (1V+1E)</option>
                                <option value="P5">P5: Privat Umzug Simple (1V)</option>
                                <option value="P6">P6: Privat Complex Eisenstadt (7000)</option>
                                <option value="P7">P7: Privat PV Mistelbach (2130)</option>
                                <option value="P8">P8: Privat Eisenstadt (Wunschdatum)</option>
                                <option value="G1">G1: Gewerbe Standard (1V)</option>
                                <option value="G2">G2: Gewerbe Neubau (1V+1E)</option>
                            </select>
                            <button onClick={() => loadScenario(selectedScenario)} className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded text-xs font-bold transition-colors">Laden</button>
                        </div>
                    </div>
                )}

                <form ref={formRef} className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <ProgressIndicator currentStep={step} totalSteps={3} />
                    
                    <fieldset disabled={step !== 1} className={`${step === 1 ? 'block' : 'hidden'}`}>
                        <StepPersonal formData={formData} handleChange={handleChange} handleInvalid={handleInvalid} handlePhoneInput={handlePhoneInput} maxDobDate={maxDobDate} />
                    </fieldset>

                    <fieldset disabled={step !== 2} className={`${step === 2 ? 'block' : 'hidden'}`}>
                        <StepTariff 
                            formData={formData} handleChange={handleChange} handleInvalid={handleInvalid} 
                            handleMeterPointChange={handleMeterPointChange} handleAddMeterPoint={handleAddMeterPoint} handleRemoveMeterPoint={handleRemoveMeterPoint}
                            setFormData={setFormData} isUniqueMeterNumber={isUniqueMeterNumber} minChangeDate={minChangeDate}
                            handleStorageSelect={handleStorageSelect}
                        />
                    </fieldset>
                    
                    <fieldset disabled={step !== 3} className={`${step === 3 ? 'block' : 'hidden'}`}>
                        <StepPayment formData={formData} handleChange={handleChange} handleInvalid={handleInvalid} handleIbanBlur={handleIbanBlur} />
                    </fieldset>

                    <div className="pt-8 flex justify-between items-center border-t border-gray-200 mt-6">
                        <div>
                            {step > 1 && <button type="button" onClick={prevStep} className="font-bold text-gray-600 hover:text-[#2b2d33] transition-colors flex items-center gap-1">&larr; Zurück</button>}
                        </div>
                        <div>
                            {step < 3 && <Button size="lg" onClick={nextStep} className="font-extrabold px-10 !shadow-none">Weiter &rarr;</Button>}
                            {step === 3 && <Button size="lg" className="w-full font-extrabold text-lg px-8 !shadow-none" onClick={handleFinalSubmit}>Anmeldung abschließen</Button>}
                        </div>
                    </div>
                    {formStage === 'details' && <p className="text-left text-sm text-[#2b2d33] font-bold border-t pt-4">Alle mit * markierten Felder sind Pflichtfelder</p>}
                </form>
            </div>
        </div>
    );
}
