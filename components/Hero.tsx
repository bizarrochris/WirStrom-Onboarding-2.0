
import React from 'react';
import { Button } from './common/Button';

export const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative container mx-auto px-6 py-40 md:py-56 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl tracking-tight drop-shadow-lg"><span className="font-bold">Raiffeisen</span> <span className="italic font-normal">WirStrom</span></h1>
        <p className="mt-4 text-lg md:text-2xl max-w-3xl drop-shadow-md">
          Ihre maximal regionale Stromversorgung: einfach, sicher & fair.
        </p>
        <div className="mt-10">
            <Button size="lg">Jetzt anmelden</Button>
        </div>
        <div className="absolute top-1/2 -left-8 md:left-12 transform -translate-y-1/2 -rotate-12 bg-white text-dark-green px-4 py-2 rounded-lg shadow-xl hidden md:block">
          <p className="font-bold text-lg">Ö nur <span className="text-raiffeisen-green">8,76 ct</span></p>
          <p className="text-sm">pro kWh*</p>
        </div>
      </div>
    </section>
  );
};
