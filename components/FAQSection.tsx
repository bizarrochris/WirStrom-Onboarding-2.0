
import React, { useState } from 'react';
import { ChevronDownIcon } from './common/Icons';

const faqData = [
  {
    question: 'Was ist eine Energiegemeinschaft (EEG)?',
    answer: 'Eine Energiegemeinschaft ist ein Zusammenschluss von Personen, die gemeinsam erneuerbare Energie erzeugen, verbrauchen und speichern. Dies fördert die lokale Energieerzeugung und reduziert die Abhängigkeit von großen Stromanbietern.',
  },
  {
    question: 'Wie funktioniert der Wechsel zu WirStrom?',
    answer: 'Der Wechsel ist ganz einfach! Sie melden sich online an, und wir kümmern uns um alles Weitere, inklusive der Kündigung bei Ihrem alten Anbieter und der Anmeldung beim Netzbetreiber.',
  },
  {
    question: 'Benötige ich einen Smart Meter?',
    answer: 'Ja, ein Smart Meter ist erforderlich, um die Vorteile der regionalen Tarife voll auszuschöpfen. Er ermöglicht eine genaue Abrechnung Ihres Verbrauchs und Ihrer Einspeisung. Wir unterstützen Sie bei der Freigabe der Daten.',
  },
  {
    question: 'Was passiert, wenn die regionale Energie nicht ausreicht?',
    answer: 'Keine Sorge, Ihre Versorgung ist jederzeit gesichert. Sollte die Energie aus der Gemeinschaft nicht ausreichen, beziehen wir automatisch 100% Ökostrom aus dem Netz, um Ihren Bedarf zu decken.',
  },
    {
    question: 'Kann ich auch Strom einspeisen?',
    answer: 'Ja, wenn Sie eine eigene PV-Anlage haben, können Sie überschüssigen Strom ins Netz einspeisen und erhalten dafür eine Vergütung. Unser Tarif "Optional Einspeiser" ist dafür ideal.',
  },
];

const FaqItem: React.FC<{
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 text-left text-lg font-medium text-black hover:text-raiffeisen-green"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <ChevronDownIcon className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <p className="pb-5 pr-10 text-gray-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-light-green-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black">Häufig gestellte Fragen (FAQ)</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Antworten auf Ihre Fragen. Schnell, einfach und unkompliziert.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};