
import React from 'react';
import { Button } from './common/Button';

export const IndependenceSection: React.FC = () => {
    return (
        <section className="bg-[#f4f1ea] rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch">
                <div className="w-full md:w-1/2 relative min-h-[300px]">
                    <img
                        src="https://raiffeisen-fairstrom.at/mitarbeiter/images/2025/08/14/bild2.png"
                        alt="Woman in a sunny field holding a scarf"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl lg:text-[24px] text-black leading-tight mb-4 font-normal">
                        Jetzt zur eigenen Energieunabhängigkeit mit einem Speicher aus Österreich
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-base mb-6">
                        Maximieren Sie Ihren Eigenverbrauch mit einem Stromspeicher 'Made in Austria'.
                        Ideal kombinierbar mit Ihrer bestehenden oder neuen PV-Anlage. Ob Kauf oder Abo: Sie entscheiden flexibel.
                    </p>
                    <div>
                        <Button variant="dark" className="rounded-md px-6 py-3 font-normal text-sm uppercase tracking-wide">Mehr erfahren</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
