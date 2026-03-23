import React, { useState } from 'react';
import { PricingProps, PricingCalculations } from './PricingTypes';
import { isEegExcluded, getEegPriceConfig, isNoeZip, isStPoeltenZip } from '../registration/RegistrationConfig';

export const usePricing = ({ isProducer, storageOption, zipCode }: PricingProps): PricingCalculations => {
    const [promoInput, setPromoInput] = useState('');
    const [isPromoActive, setIsPromoActive] = useState(false);
    const [promoSubmitted, setPromoSubmitted] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [greenBoxHover, setGreenBoxHover] = useState(false);

    const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPromoInput(val);
        const normalized = val.trim().toUpperCase();
        if (normalized === '0000' || normalized === 'MA') {
            setIsPromoActive(true);
            setPromoSubmitted(true);
        } else {
            setIsPromoActive(false);
            setPromoSubmitted(false);
        }
    };

    const handlePromoBlur = () => {
        if (promoInput.trim().length > 0) {
            setPromoSubmitted(true);
        }
    };

    const handlePromoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (promoInput.trim().length > 0) {
                setPromoSubmitted(true);
            }
        }
    };

    const getCommunityNames = (zip: string) => {
        if (isStPoeltenZip(zip)) {
            return {
                eeg: "Energiegemeinschaft in St. Pölten",
                beg: "Bürgerenergiegemeinschaft Impuls 2.0",
                isLocalized: true
            };
        }
        if (zip.startsWith('7')) {
             return {
                 eeg: "Energiegemeinschaft im Burgenland",
                 beg: "Bürgerenergiegemeinschaft",
                 isLocalized: true
             };
        } else if (isNoeZip(zip)) {
            return {
                 eeg: "Energiegemeinschaft in Niederösterreich",
                 beg: "Bürgerenergiegemeinschaft",
                 isLocalized: true
             };
        }
        return {
            eeg: "Energiegemeinschaft",
            beg: "Bürgerenergiegemeinschaft",
            isLocalized: false
        };
    }

    const communities = getCommunityNames(zipCode);
    
    // Logic change: Storage Discount can be active together with Promo Code
    const isStorageDiscountActive = (storageOption === 'offer');
    
    const showEEG = !isEegExcluded(zipCode);
    
    // Determine EEG Price and Prefix
    const { price: priceEEG, prefix: eegPrefix } = getEegPriceConfig(zipCode);

    // --- BEG Price Logic ---
    const standardBEG = isStPoeltenZip(zipCode) ? 9.90 : 9.99;
    const promoBEG = 8.99;
    const priceBEG = isPromoActive ? promoBEG : standardBEG;

    // --- Ökostrom Price Logic ---
    const standardBasePrice = 11.99; 
    const promoBasePrice = 10.99;
    const listPriceStr = '14,99';

    // Start with either the promo price or the standard price
    let currentBasePrice = isPromoActive ? promoBasePrice : standardBasePrice;
    
    // Apply storage discount (on top of whatever the current base is)
    // Note: Since isStorageDiscountActive is forced to false if isPromoActive is true, this won't double dip
    if (isStorageDiscountActive) {
        currentBasePrice = currentBasePrice * 0.9;
    }

    const finalPriceStr = currentBasePrice.toFixed(2).replace('.', ',');

    // Badge & Strikethrough Logic
    let strikeThroughPrice = listPriceStr;
    let badgeText = 'Spezialtarif';

    if (isStorageDiscountActive) {
        // If storage bonus is active, we strike through the price "before storage discount"
        // This is either the promo price or the standard price
        strikeThroughPrice = isPromoActive ? '10,99' : '11,99';
        badgeText = 'Speicherbonus';
    } else if (isPromoActive) {
        // If only promo is active, we strike through the standard price (11.00)
        strikeThroughPrice = '11,99';
        badgeText = 'Mitarbeiterbonus';
    } else {
        // Standard case: 11.00 is a deal compared to list price 12.90
        strikeThroughPrice = listPriceStr;
        badgeText = 'Spezialtarif';
    }

    // Grundpreis Logic
    const standardMonthlyPrice = 6.33;
    const promoMonthlyPrice = 3.60;
    const currentMonthlyPrice = isPromoActive ? promoMonthlyPrice : standardMonthlyPrice;
    const monthlyPriceStr = currentMonthlyPrice.toFixed(2).replace('.', ',');
    
    // Consumption Weighted Average
    const reductionAmount = isEegExcluded(zipCode) ? 0 : 0; //1.40 removed by CB;
    
    // Weights change if EEG is excluded
    const weightEEG = showEEG ? 0.26 : 0;
    const weightBEG = showEEG ? 0.36 : 0.50;
    const weightOeko = showEEG ? 0.38 : 0.50;

    const avgPriceVal = (priceEEG * weightEEG) + ((priceBEG - reductionAmount) * weightBEG) + ((currentBasePrice - reductionAmount) * weightOeko);
    const currentAvg = avgPriceVal.toFixed(2).replace('.', ',');

    // Feed-in Weighted Average
    const feedInEEG = isStPoeltenZip(zipCode) ? 8.00 : 9.00;
    const feedInBEG = 8.00;
    const feedInOeko = isPromoActive ? 7.00 : 4.00;
    
    // Feed-in weights change if EEG is excluded
    const weightFeedEEG = showEEG ? 0.30 : 0;
    const weightFeedBEG = showEEG ? 0.30 : 0.50;
    const weightFeedOeko = showEEG ? 0.40 : 0.50;
    
    const avgFeedInVal = (feedInEEG * weightFeedEEG) + (feedInBEG * weightFeedBEG) + (feedInOeko * weightFeedOeko);
    const currentAvgFeedIn = avgFeedInVal.toFixed(2).replace('.', ',');

    return {
        // State
        promoInput, isPromoActive, promoSubmitted, isMobileOpen, greenBoxHover,
        setPromoInput, setPromoSubmitted, setIsMobileOpen, setGreenBoxHover,
        handlePromoChange, handlePromoBlur, handlePromoKeyDown,

        // Calculations
        communities, showEEG, isStorageDiscountActive,
        priceEEG, eegPrefix, priceBEG,
        standardBasePrice, currentBasePrice, finalPriceStr,
        strikeThroughPrice, badgeText,
        standardMonthlyPrice, currentMonthlyPrice, monthlyPriceStr,
        currentAvg,
        feedInEEG, feedInBEG, feedInOeko, currentAvgFeedIn
    };
};
