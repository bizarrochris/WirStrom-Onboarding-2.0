
import React from 'react';
import { Card } from './common/Card';

const PriceDetail: React.FC<{ value: string, label: string }> = ({ value, label }) => (
    <p className="text-lg">
        <span className="font-bold text-2xl">{value}</span>
        <span className="text-gray-500"> / {label}</span>
    </p>
);

const AnnualCost: React.FC<{ cost: string }> = ({ cost }) => (
    <div className="text-center">
        <p className="text-sm text-gray-500">Ø Jahreskosten*</p>
        <p className="text-4xl font-bold text-black">{cost} €</p>
    </div>
);

export const PricingSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Ihr Preisvorteil im direkten Vergleich</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Wir machen Schluss mit undurchsichtigen Tarifen. Sehen Sie, wie sich unser fairer Mix direkt auf Ihre Kosten auswirkt.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="flex flex-col gap-6 p-8 items-center border-2">
            <h3 className="text-2xl font-bold text-gray-700">Herkömmlicher Tarif</h3>
            <PriceDetail value="33,9 ct" label="kWh Arbeitspreis" />
            <PriceDetail value="5,00 €" label="Monat Grundgebühr" />
            <hr className="w-full my-4" />
            <AnnualCost cost="1.585" />
          </Card>
          <Card className="relative flex flex-col gap-6 p-8 items-center bg-dark-green text-white border-2 border-dark-green shadow-2xl">
            <div className="absolute -top-4 bg-raiffeisen-yellow text-black px-4 py-1 rounded-lg text-sm font-bold">Ihr Vorteil</div>
            <h3 className="text-2xl text-raiffeisen-yellow"><span className="font-bold">Raiffeisen</span> <span className="italic font-normal">WirStrom</span> Tarif</h3>
             <p className="text-lg">
                <span className="font-bold text-2xl">8,76 ct</span>
                <span className="text-gray-300"> / kWh Arbeitspreis</span>
            </p>
             <p className="text-lg">
                <span className="font-bold text-2xl">5,99 €</span>
                <span className="text-gray-300"> / Monat Grundgebühr</span>
            </p>
            <hr className="w-full my-4 border-gray-500" />
             <div className="text-center">
                <p className="text-sm text-gray-300">Ø Jahreskosten*</p>
                <p className="text-4xl font-bold text-white">466 €</p>
            </div>
            <div className="mt-4 bg-raiffeisen-green text-white font-bold py-2 px-6 rounded-lg">
              Sie sparen bis zu 1.119 € jährlich!*
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
