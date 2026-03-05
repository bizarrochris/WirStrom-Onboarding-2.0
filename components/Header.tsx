
import React from 'react';
import { Button } from './common/Button';

const RaiffeisenLogo: React.FC = () => (
    <div className="flex items-center gap-3">
        <div className="w-[60px] h-[60px] bg-raiffeisen-yellow p-1.5 flex items-center justify-center">
            <svg 
                version="1.0" 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
            >
                <g transform="translate(0,1024) scale(0.1,-0.1)"
                fill="#000000" stroke="none">
                <path d="M7240 8529 c-155 -19 -325 -80 -448 -163 -45 -30 -274 -252 -707 -685 l-640 -641 158 -158 157 -157 -320 -320 -320 -320 -315 315 c-173 173 -315 319 -315 325 0 5 69 78 152 162 l153 153 -630 631 c-347 347 -657 650 -690 674 -183 131 -405 194 -649 182 -285 -13 -535 -135 -776 -376 -278 -279 -458 -606 -544 -991 -30 -137 -46 -259 -46 -355 l0 -70 150 150 150 150 620 -620 620 -620 150 151 150 150 0 430 0 429 180 -180 180 -180 0 -490 0 -490 247 -247 248 -248 -1225 -1225 -1224 -1224 484 -480 485 -479 1223 1221 1222 1222 1223 -1222 1222 -1221 485 479 484 480 -1224 1224 -1225 1225 248 248 247 247 0 490 0 490 180 180 180 180 0 -425 0 -425 152 -152 153 -153 617 617 618 618 155 -155 155 -155 0 37 c0 59 -19 237 -36 326 -115 630 -564 1224 -1053 1391 -140 48 -319 68 -461 50z"/>
                </g>
            </svg>
        </div>
        <div>
            <span className="block font-bold text-lg text-black leading-tight">Raiffeisen</span>
            <span className="block font-bold text-lg text-black leading-tight">Energiengenossenschaften</span>
        </div>
    </div>
);


export const Header: React.FC = () => {
  const navLinks = ["Ihre Vorteile", "Die Ersparnis", "So funktioniert's", "FAQs", "Speicher", "Kontakt"];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <RaiffeisenLogo />
        
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-black hover:text-raiffeisen-green font-semibold transition-colors">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
