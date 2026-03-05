import React from 'react';
import { Button } from './common/Button';
import { PercentageIcon, DocumentIcon, LightbulbIcon } from './common/Icons';

const advantages = [
  {
    icon: <PercentageIcon />,
    title: 'Maximale Ersparnis',
    description: 'Sparen Sie bis zu 275 € jährlich durch clevere Kombination regionaler Energie und reduzierter Netzentgelte.',
  },
  {
    icon: <DocumentIcon />,
    title: 'Eine Rechnung',
    description: 'Alles in einem Tarif: zukünftig keine getrennten Anbieter, keine doppelten Abrechnungen.',
  },
  {
    icon: <LightbulbIcon />,
    title: 'Regionale Versorgung',
    description: '100% erneuerbar, aus österreichischen Anlagen – für eine klimafreundliche Zukunft.',
  },
];

export const AdvantagesSection: React.FC = () => {
  return (
    <section className="bg-raiffeisen-green text-white py-16 sm:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Ihre Vorteile des WirStrom Tarifs</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">Bestens versorgt mit unserem Komplettangebot</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {advantages.map((advantage) => (
            <div key={advantage.title} className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center items-center h-16 w-16 mx-auto bg-white/20 rounded-lg mb-6">
                {advantage.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{advantage.title}</h3>
              <p className="opacity-90">{advantage.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16">
            <Button>Jetzt anmelden</Button>
        </div>
      </div>
    </section>
  );
};