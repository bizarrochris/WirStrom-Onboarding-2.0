
import React from 'react';

export interface PricingProps {
    isProducer: string;
    storageOption: string;
    zipCode: string;
}

export interface CommunityNames {
    eeg: string;
    beg: string;
    isLocalized: boolean;
}

export interface PricingCalculations {
    // State
    promoInput: string;
    isPromoActive: boolean;
    promoSubmitted: boolean;
    isMobileOpen: boolean;
    greenBoxHover: boolean;
    
    // Setters
    setPromoInput: (val: string) => void;
    setPromoSubmitted: (val: boolean) => void;
    setIsMobileOpen: (val: boolean) => void;
    setGreenBoxHover: (val: boolean) => void;
    handlePromoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePromoBlur: () => void;
    handlePromoKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;

    // Computed Values
    communities: CommunityNames;
    showEEG: boolean;
    isStorageDiscountActive: boolean;
    
    // Consumption Prices
    priceEEG: number;
    eegPrefix: string;
    priceBEG: number;
    standardBasePrice: number;
    currentBasePrice: number;
    finalPriceStr: string;
    strikeThroughPrice: string;
    badgeText: string;
    standardMonthlyPrice: number;
    currentMonthlyPrice: number;
    monthlyPriceStr: string;
    currentAvg: string;

    // Feed In Prices
    feedInEEG: number;
    feedInBEG: number;
    feedInOeko: number;
    currentAvgFeedIn: string;
}
