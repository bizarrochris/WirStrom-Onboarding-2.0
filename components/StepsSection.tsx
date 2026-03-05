
import React from 'react';
import { Button } from './common/Button';

const steps = [
  {
    num: '01',
    title: 'Einfache Registrierung',
    description: 'Nach Ihrer Anmeldung erhalten Sie einen Anruf und ein E-Mail mit allen Informationen.',
  },
  {
    num: '02',
    title: 'Wir melden Sie an',
    description: 'Wir kümmern uns um die Anmeldung beim Netzbetreiber – und empfehlen Ihnen passende Energiegemeinschaften, falls Sie noch keiner angehören.',
  },
  {
    num: '03',
    title: 'Datenfreigabeprozess Smart-Meter',
    description: 'Um die genaue Abrechnung und maximale Regionalität zu ermöglichen, benötigen wir Ihre Freigabe zur Verarbeitung der Smart-Meter Daten.',
  },
  {
    num: '04',
    title: 'Belieferungsstart',
    description: 'Sobald Ihr Liefertermin feststeht, informieren wir Sie – ab dann erhalten Sie 100 % regionalen Ökostrom.',
  },
];

export const StepsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black">In 4 einfachen Schritten zu WirStrom</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Wir übernehmen den gesamten Wechselprozess für Sie. Lediglich bei der Smart-Meter Freigabe benötigen wir einmalig Ihre Mithilfe.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {steps.map((step) => (
            <div key={step.num} className="text-center md:text-left">
              <div className="flex justify-center md:justify-start items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-12 h-12 bg-raiffeisen-green text-white font-bold text-xl rounded-full">
                  {step.num}
                </span>
                <h3 className="text-xl font-bold text-black">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
            <Button>Jetzt anmelden</Button>
        </div>
      </div>
    </section>
  );
};