
import { VALID_METER_PREFIXES } from './RegistrationConfig';

export const formatChunked = (value: string) => {
    if (!value) return '';
    const raw = value.replace(/[^a-zA-Z0-9]/g, '');
    const chunks = raw.match(/.{1,4}/g) || [];
    return chunks.join(' ');
};

export function isValidIban(iban: string) {
    if (!iban) return false;
    const cleanIban = iban.replace(/\s+/g, "").toUpperCase();
    if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/.test(cleanIban)) return false;
    const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);
    let numeric = "";
    for (let ch of rearranged) {
      if (/[A-Z]/.test(ch)) numeric += (ch.charCodeAt(0) - 55).toString();
      else numeric += ch;
    }
    try {
        const remainder = BigInt(numeric) % 97n;
        return remainder === 1n;
    } catch (e) { return false; }
}

export const isValidMeterPrefix = (meterNumber: string): boolean => {
    if (!meterNumber) return false;
    const cleanMeter = meterNumber.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
    const prefix = cleanMeter.startsWith('AT') ? cleanMeter.slice(0, 8) : `AT${cleanMeter.slice(0, 6)}`;
    return VALID_METER_PREFIXES.includes(prefix);
};

export const isValid = (fieldName: string, value: string | undefined): boolean => {
    if (!value) return false;
    if (fieldName === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (fieldName === 'zip') return /^\d{4}$/.test(value);
    if (fieldName === 'iban') return isValidIban(value);
    if (fieldName === 'phone') return value.length >= 7;
    if (fieldName === 'meterNumber') {
        const clean = value.replace(/[^0-9a-zA-Z]/g, '');
        return clean.length === 31 && isValidMeterPrefix(clean);
    }
    if (fieldName === 'text') return value.length > 1; 
    if (fieldName === 'name') return value.length > 1 && !/\d/.test(value);
    if (fieldName === 'houseNumber') return !!value && value.length > 0;
    return value.length > 1; 
};
