
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2b2d33] text-white">
      <div className="container mx-auto px-6 py-8 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Raiffeisen. Alle Rechte vorbehalten.</p>
        <div className="mt-4 flex justify-center gap-6 text-sm">
          <a href="#" className="hover:text-raiffeisen-yellow transition-colors">Impressum</a>
          <a href="#" className="hover:text-raiffeisen-yellow transition-colors">Datenschutz</a>
          <a href="#" className="hover:text-raiffeisen-yellow transition-colors">AGB</a>
        </div>
      </div>
    </footer>
  );
};