
import React from 'react';
import { Card } from './common/Card';

export const HowItWorksDiagram: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-light-green-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">So funktioniert unser Preis</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Anstatt eines einzigen teuren Tarifs, kombinieren wir intelligenten Strom aus drei günstigeren, regionalen Quellen. Das Ergebnis ist ein dauerhaft niedrigerer Durchschnittspreis für Sie.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6">
            <h3 className="font-bold text-center text-lg mb-4">Herkömmlicher Tarif</h3>
            <div className="bg-red-500 h-48 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              33,9 ct / kWh
            </div>
            <p className="text-center mt-4 text-gray-600">Ein Preis für alles, oft ohne regionale Vorteile und mit hohen Netzkosten.</p>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-center text-lg mb-4">WirStrom-Mix</h3>
            <div className="h-48 rounded-lg flex flex-col overflow-hidden">
                <div className="flex-1 bg-raiffeisen-green flex items-center justify-center text-white font-bold text-sm text-center p-1">Regionaler Ökostrom<br/>10,49 ct / kWh</div>
                <div className="flex-1 bg-lime-400 flex items-center justify-center text-black font-bold text-sm text-center p-1">BEG<br/>8,99 ct / kWh</div>
                <div className="flex-1 bg-dark-green flex items-center justify-center text-white font-bold text-sm text-center p-1">EEG<br/>5,90 ct / kWh</div>
            </div>
             <p className="text-center mt-4 text-gray-600">Ein Preis für alles, oft ohne regionale Vorteile und mit hohen Netzkosten.</p>
          </Card>
        </div>
      </div>
    </section>
  );
};
