
import React, { useState } from 'react';
import { Header } from './components/Header';
import { RegistrationForm } from './components/RegistrationForm';
import { PricingSidebar } from './components/PricingSidebar';
import { IndependenceSection } from './components/IndependenceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Button } from './components/common/Button';
import { footnote1Text, footnote2Text, footnote3Text } from './components/pricing/PricingConstants';

const FootnoteSection: React.FC = () => (
    <section className="bg-[#f8f9fa] border-t border-gray-200 py-16 text-xs text-gray-500 leading-relaxed">
        <div className="container mx-auto px-6 max-w-4xl">
             <h4 className="font-bold text-gray-700 text-sm mb-6 uppercase tracking-wider">RECHTLICHES & ERKLÄRUNGEN</h4>
             <div className="space-y-6">
                <div>
                    <p className="mb-1 font-bold text-gray-700 uppercase tracking-wider text-[10px]">1. Vertragsbindung</p>
                    <p><sup className="font-bold mr-1">1</sup>{footnote1Text}</p>
                </div>
                <div>
                    <p className="mb-1 font-bold text-gray-700 uppercase tracking-wider text-[10px]">2. Preisbestandteile</p>
                    <p><sup className="font-bold mr-1">2</sup>{footnote2Text}</p>
                </div>
                <div>
                    <p className="mb-1 font-bold text-gray-700 uppercase tracking-wider text-[10px]">3. Preiszusammensetzung</p>
                    <div>
                        <p className="inline"><sup className="font-bold mr-1">3</sup>Nach Ersparnis: Die genannten Arbeitspreise von „ab 4,50 ct/kWh“ sind rechnerische Werte und beziehen sich auf die Verbrauchstarife unter Berücksichtigung möglicher gesetzlicher Vergünstigungen aus der Teilnahme an einer Energiegemeinschaft (insb. Reduktion bestimmter Netzentgelte, kein Erneuerbaren-Förderbeitrag und – soweit gesetzlich vorgesehen – keine Elektrizitätsabgabe).</p>
                        <div className="mt-2">{footnote3Text}</div>
                    </div>
                </div>
             </div>
        </div>
    </section>
);

const App: React.FC = () => {
  const [isProducer, setIsProducer] = useState('no');
  const [storageOption, setStorageOption] = useState('no');
  const [zipCode, setZipCode] = useState('');

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row w-full md:h-[200px]">
            <div className="w-full md:w-1/2 bg-raiffeisen-yellow text-black flex items-center justify-start md:justify-center h-full">
                <div className="px-6 py-8 md:py-0 lg:px-24 max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-widest mb-2">RAIFFEISEN WIRSTROM</p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">Jetzt anmelden und frühzeitig Vorteile sichern</h2>
                </div>
            </div>
            <div className="w-full md:w-1/2 h-[200px] md:h-full relative">
                <img 
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop" 
                    alt="Regionale Stromversorgung" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
        <div className="container mx-auto px-6 py-12 md:py-16">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
                <aside className="lg:w-[40%] w-full order-1 lg:order-2">
                    <PricingSidebar 
                        isProducer={isProducer} 
                        storageOption={storageOption} 
                        zipCode={zipCode}
                    />
                </aside>
                <main className="lg:w-[60%] w-full flex flex-col gap-12 sm:gap-20 order-2 lg:order-1">
                    <div id="registration-form">
                        <RegistrationForm 
                            setIsProducer={setIsProducer} 
                            setStorageOption={setStorageOption} 
                            setZipCode={setZipCode}
                        />
                    </div>
                    <IndependenceSection />
                    <ContactSection />
                </main>
            </div>
        </div>
      </div>
      <FootnoteSection />
      <Footer />
    </div>
  );
};

export default App;
