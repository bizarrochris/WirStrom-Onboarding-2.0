
import React from 'react';
import { Button } from './common/Button';
import { EmailIcon, PhoneIcon } from './common/Icons';

export const ContactSection: React.FC = () => {
  return (
    <section className="mt-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black">Sie haben noch Fragen?</h2>
        <p className="text-gray-600 mt-2">Wir helfen gerne weiter!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center gap-4 text-center">
          <div className="p-3 bg-light-green-bg rounded-full">
             <EmailIcon />
          </div>
          <div>
            <p className="font-bold text-lg mb-1">E-Mail</p>
            <p className="font-medium text-gray-600 mb-4">info@raiffeisen-wirstrom.at</p>
            <Button variant="secondary" className="w-full">Schreiben Sie uns</Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col items-center gap-4 text-center">
           <div className="p-3 bg-light-green-bg rounded-full">
            <PhoneIcon className="w-10 h-10 text-raiffeisen-green"/>
          </div>
          <div>
            <p className="font-bold text-lg mb-1">Telefon</p>
            <p className="font-medium text-gray-600 mb-4">+43 3326 52496 500</p>
            <Button variant="secondary" className="w-full">Rufen Sie uns an</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
