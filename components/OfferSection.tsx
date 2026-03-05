
import React from 'react';
import { Card } from './common/Card';

const offers = [
  {
    title: 'Nachbarstrom (EEG)',
    description: 'Günstigster Strom dank reduzierter Netzentgelte.',
  },
  {
    title: 'Bürgerenergie (BEG)',
    description: 'Aus regionalen Wind- & Solarparks zu fairen Preisen.',
  },
  {
    title: 'Regionaler Ökostrom',
    description: '100% grüner Strom zur Absicherung von Bedarfsspitzen.',
  },
  {
    title: 'Optional Einspeiser',
    description: 'Wenn Sie mehr einspeisen als in die EEG möglich nehmen wir das ab.',
  },
];

export const OfferSection: React.FC = () => {
  return (
    <section className="bg-light-green-bg py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Unser Regionales Energieangebot</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer) => (
            <Card key={offer.title} className="text-center">
              <h3 className="text-xl font-bold text-black mb-2">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};