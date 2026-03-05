
export interface MeterPoint {
    id: number;
    meterNumber: string;
    kwp?: string;
    addressDifferent?: boolean;
    streetName?: string;
    houseNumber?: string;
    addition?: string;
    stiege?: string;
    topNumber?: string;
    zip?: string;
    city?: string;
    isVatLiable?: boolean;
    previousProvider?: string;
}

export interface RegistrationFormData {
    salutation: string;
    firstName: string;
    lastName: string;
    customerType: string;
    companyName: string;
    uid: string;
    dob: string;
    streetName: string;
    houseNumber: string;
    addition: string;
    stiege: string;
    topNumber: string;
    zip: string;
    city: string;
    phone: string;
    phonePrefix: string;
    email: string;
    hasSecondPartner: boolean;
    secondPartnerSalutation: string;
    secondPartnerFirstName: string;
    secondPartnerLastName: string;
    secondPartnerDob: string;
    paymentMethod: string;
    invoiceEmailOption: string;
    invoiceEmail: string;
    accountHolder: string;
    isAccountHolderSame: boolean;
    iban: string;
    changeDateType: string;
    customChangeDate: string;
    previousProvider: string;
    consumption: string;
    storage: string;
    isProducer: string;
    isMember: string;
    consumptionMeterPoints: MeterPoint[];
    meterNumberLater: boolean;
    einspeiseMeterPoints: MeterPoint[];
    einspeiseMeterNumberLater: boolean;
    consentSepaDirectDebit: boolean;
    consentCommunication: boolean;
    consentMarketing: boolean;
    consentGeneralPowerOfAttorney: boolean;
    consentMaxenergyPowerOfAttorney: boolean;
    consentAGB: boolean;
    consentPriceSheet: boolean;
}
