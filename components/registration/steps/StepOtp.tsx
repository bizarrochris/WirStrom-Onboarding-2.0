
import React from 'react';
import { Button } from '../../common/Button';
import { RegistrationFormData } from '../RegistrationTypes';

interface Props {
    formData: RegistrationFormData;
    otpCode: string[];
    setOtpCode: (code: string[]) => void;
    otpError: string | null;
    setOtpError: (err: string | null) => void;
    otpInputs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    onSubmit: (e: React.FormEvent) => void;
    onBack: () => void;
}

export const StepOtp: React.FC<Props> = ({ formData, otpCode, setOtpCode, otpError, setOtpError, otpInputs, onSubmit, onBack }) => {
    const handleOtpChange = (index: number, value: string) => {
        setOtpError(null);
        const newOtp = [...otpCode];
        if (value.length > 1) value = value.slice(-1); 
        newOtp[index] = value;
        setOtpCode(newOtp);
        if (value && index < 5) otpInputs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otpCode[index] && index > 0) otpInputs.current[index - 1]?.focus();
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#2b2d33] mb-2">E-Mail Bestätigung</h3>
                    <p className="text-gray-600">Wir haben einen 6-stelligen Bestätigungscode an <span className="font-bold text-[#2b2d33]">{formData.email}</span> gesendet.</p>
                    <button type="button" onClick={onBack} className="text-sm text-raiffeisen-green underline mt-2 hover:text-dark-green">E-Mail-Adresse korrigieren</button>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex justify-center gap-2 sm:gap-4 mb-2">
                        {otpCode.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { otpInputs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className={`w-10 h-12 sm:w-14 sm:h-16 text-center text-2xl font-bold border rounded-lg outline-none transition-all shadow-sm text-black bg-white ${otpError ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-raiffeisen-green focus:ring-raiffeisen-green'}`}
                            />
                        ))}
                    </div>
                    {otpError && <p className="text-red-500 text-sm font-bold animate-pulse">{otpError}</p>}
                </div>

                <div className="pt-4">
                    <Button size="lg" className="w-full font-extrabold text-lg !shadow-none" type="submit">Code bestätigen</Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">Keinen Code erhalten? <button type="button" className="text-raiffeisen-green font-bold hover:underline" onClick={() => alert("Neuer Code gesendet!")}>Erneut senden</button></p>
            </form>
        </div>
    );
};
