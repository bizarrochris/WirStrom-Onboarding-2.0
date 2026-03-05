
import React, { useEffect, useState } from 'react';
import { Button } from '../../common/Button';
import { CheckCircleIcon, DocumentIcon } from '../../common/Icons';
import { jsPDF } from 'jspdf';
import { CONSENT_TEXTS } from '../RegistrationConfig';

interface Props {
    firstName: string;
    payloads: { type: string; id: string; data: any }[];
    onPrintSummary: () => void;
}

export const StepCompletion: React.FC<Props> = ({ firstName, payloads }) => {
    const [clientIp, setClientIp] = useState<string>('wird ermittelt...');

    useEffect(() => {
        // Simple fetch to get client IP for the signature
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => setClientIp(data.ip))
            .catch(() => setClientIp('Nicht ermittelbar'));
    }, []);

    const handlePrintSummary = () => {
        try {
            const doc = new jsPDF();
            
            // --- Design Constants ---
            const colors = {
                yellow: [254, 230, 0] as [number, number, number], // #fee600
                dark: [43, 45, 51] as [number, number, number],   // #2b2d33
                grey: [100, 100, 100] as [number, number, number],
                lightGrey: [240, 240, 240] as [number, number, number],
                white: [255, 255, 255] as [number, number, number]
            };

            const fonts = {
                bold: "helvetica", // jsPDF default font map
                normal: "helvetica"
            };

            let y = 0; // Vertical cursor
            const margin = 20;
            const pageWidth = 210;
            const contentWidth = pageWidth - (margin * 2);

            // --- Helper Functions ---

            // Strip HTML tags for PDF text
            const stripHtml = (html: string) => {
                const tmp = document.createElement("DIV");
                tmp.innerHTML = html;
                return tmp.textContent || tmp.innerText || "";
            };

            const drawHeader = () => {
                // Yellow Header Bar
                doc.setFillColor(...colors.yellow);
                doc.rect(0, 0, pageWidth, 35, 'F');

                // Logo/Title Area
                doc.setFont(fonts.bold, "bold");
                doc.setFontSize(22);
                doc.setTextColor(...colors.dark);
                doc.text("Anmeldebestätigung", margin, 22);

                doc.setFont(fonts.normal, "normal");
                doc.setFontSize(10);
                doc.text("Raiffeisen WirStrom", margin, 28);

                // Date
                doc.setFontSize(9);
                doc.text(`Datum: ${new Date().toLocaleDateString('de-AT')}`, pageWidth - margin, 22, { align: 'right' });
                
                y = 50; // Reset Y below header
            };

            const checkPageBreak = (heightNeeded: number) => {
                if (y + heightNeeded > 270) { // slightly less than 280 to leave room for footer
                    doc.addPage();
                    // Simple top margin on new pages
                    y = 30; 
                }
            };

            const addSectionTitle = (title: string) => {
                checkPageBreak(15);
                doc.setFont(fonts.bold, "bold");
                doc.setFontSize(14);
                doc.setTextColor(...colors.dark);
                doc.text(title.toUpperCase(), margin, y);
                
                // Yellow underline
                doc.setDrawColor(...colors.yellow);
                doc.setLineWidth(1);
                doc.line(margin, y + 2, margin + 15, y + 2); // Short underline style
                
                y += 12;
            };

            const addField = (label: string, value: string) => {
                checkPageBreak(8);
                doc.setFontSize(10);
                
                // Label
                doc.setFont(fonts.bold, "bold");
                doc.setTextColor(...colors.grey);
                doc.text(label, margin, y);
                
                // Value
                doc.setFont(fonts.normal, "normal");
                doc.setTextColor(...colors.dark);
                
                // Handle long values
                const splitValue = doc.splitTextToSize(value || '-', 120);
                doc.text(splitValue, margin + 50, y);
                
                y += (splitValue.length * 5) + 3;
            };

            const addFullConsent = (title: string, text: string) => {
                checkPageBreak(25); // Minimum space to start
                
                // Consent Header
                y += 4;
                doc.setFont(fonts.bold, "bold");
                doc.setFontSize(10);
                doc.setTextColor(...colors.dark);
                
                // Checkmark icon simulation
                doc.setDrawColor(...colors.dark);
                doc.rect(margin, y - 3, 3, 3);
                doc.text("x", margin + 0.5, y - 0.5); // Checkmark inside
                
                doc.text(title, margin + 6, y);
                y += 6;

                // Full Text
                doc.setFont(fonts.normal, "normal");
                doc.setFontSize(8); // Smaller for legal text
                doc.setTextColor(...colors.grey);
                
                const cleanText = stripHtml(text);
                const splitText = doc.splitTextToSize(cleanText, contentWidth - 5);
                
                if (y + (splitText.length * 4) > 280) {
                    const pageHeight = 280;
                    let currentLine = 0;
                    
                    while (currentLine < splitText.length) {
                        const availableSpace = pageHeight - y;
                        const linesThatFit = Math.floor(availableSpace / 4);
                        
                        const chunk = splitText.slice(currentLine, currentLine + linesThatFit);
                        doc.text(chunk, margin + 5, y);
                        
                        currentLine += linesThatFit;
                        
                        if (currentLine < splitText.length) {
                            doc.addPage();
                            y = 20; // New page top margin
                        } else {
                            y += (chunk.length * 4) + 6; 
                        }
                    }
                } else {
                    doc.text(splitText, margin + 5, y);
                    y += (splitText.length * 4) + 6;
                }
            };

            // --- GENERATE CONTENT ---

            // Initial Header
            drawHeader();

            const mainPayload = payloads[0].data;
            const pData = mainPayload.privateData;
            const aData = mainPayload.addressData;
            const tData = mainPayload.tariffData;
            const bData = mainPayload.BankData;
            const sData = mainPayload.switchData;
            const cData = mainPayload.client;
            
            // 1. Kundendaten
            addSectionTitle("Kundendaten");
            addField("Name", `${pData.suffix} ${pData.first_name} ${pData.last_name}`);
            addField("Geburtsdatum", pData.birthday);
            addField("Rechnungsadresse", `${aData.street_name} ${aData.street_number}, ${aData.zipcode} ${aData.city}`);
            addField("E-Mail", aData.email);
            addField("Telefon", aData.phone_number);
            
            if (cData.client_type === "1") {
                 // Business placeholder if needed
            }

            // 2. Lieferdaten
            addSectionTitle("Lieferdaten");
            const isMoveIn = sData.start_delivery_next_possible === "0";
            addField("Wechselart", isMoveIn ? "Einzug / Wunschtermin" : "Lieferantenwechsel (Ehestmöglich)");
            addField("Startdatum", sData.start_delivery);
            addField("Bisheriger Versorger", sData.previous_supplier || "-");
            addField("Jahresverbrauch", `${tData.previous_volume} kWh`);

            // Meter Points from Payloads
            const consumptionPayloads = payloads.filter(p => p.type === 'VERBRAUCHER');
            consumptionPayloads.forEach((p, i) => {
                checkPageBreak(25);
                const zp = p.data.switchData.counter_id;
                
                doc.setFont(fonts.bold, "bold");
                doc.setFontSize(10);
                doc.setTextColor(...colors.dark);
                doc.text(`Zählpunkt ${i+1} (Bezug)`, margin, y);
                y += 6;

                // ZP Number
                doc.setFont(fonts.normal, "normal");
                doc.setFontSize(10);
                doc.setTextColor(...colors.dark);
                doc.text(zp, margin + 50, y - 6);
                
                // Address Comparison Logic
                const cAddr = p.data.consumptionAddressData;
                
                // Check equality
                const isSameAddress = 
                    cAddr.zipcode === aData.zipcode && 
                    cAddr.city === aData.city && 
                    cAddr.street_name === aData.street_name && 
                    cAddr.street_number === aData.street_number;

                doc.setFontSize(9);
                doc.setTextColor(...colors.grey);
                
                if (isSameAddress) {
                    doc.text("Lieferadresse:", margin, y);
                    doc.setFont(fonts.bold, "bold");
                    doc.text("Ident mit Rechnungsadresse", margin + 50, y);
                } else {
                    doc.text("Lieferadresse:", margin, y);
                    doc.setFont(fonts.bold, "bold");
                    doc.text(`${cAddr.street_name} ${cAddr.street_number}`, margin + 50, y);
                    y += 5;
                    doc.text(`${cAddr.zipcode} ${cAddr.city}`, margin + 50, y);
                    if (cAddr.street_additional_info) {
                         y += 5;
                         doc.text(cAddr.street_additional_info, margin + 50, y);
                    }
                }
                
                doc.setFont(fonts.normal, "normal");
                y += 8;
            });

            // Producer Data
            const producerPayloads = payloads.filter(p => p.type === 'EINSPEISER');
            if (producerPayloads.length > 0) {
                y += 5;
                addSectionTitle("Einspeisung");
                producerPayloads.forEach((p, i) => {
                    checkPageBreak(25);
                    const zp = p.data.switchData.counter_id;
                    const cAddr = p.data.consumptionAddressData;

                    doc.setFont(fonts.bold, "bold");
                    doc.setFontSize(10);
                    doc.setTextColor(...colors.dark);
                    doc.text(`Einspeisezählpunkt ${i+1}`, margin, y);
                    y += 6;
                    
                    doc.setFont(fonts.normal, "normal");
                    doc.text(zp, margin + 50, y - 6);

                    // Address Comparison Logic (Producer)
                    const isSameAddress = 
                        cAddr.zipcode === aData.zipcode && 
                        cAddr.city === aData.city && 
                        cAddr.street_name === aData.street_name && 
                        cAddr.street_number === aData.street_number;

                    doc.setFontSize(9);
                    doc.setTextColor(...colors.grey);

                    if (isSameAddress) {
                        doc.text("Standort:", margin, y);
                        doc.setFont(fonts.bold, "bold");
                        doc.text("Ident mit Rechnungsadresse", margin + 50, y);
                    } else {
                        doc.text("Standort:", margin, y);
                        doc.setFont(fonts.bold, "bold");
                        doc.text(`${cAddr.street_name} ${cAddr.street_number}`, margin + 50, y);
                        y += 5;
                        doc.text(`${cAddr.zipcode} ${cAddr.city}`, margin + 50, y);
                    }
                    doc.setFont(fonts.normal, "normal");
                    y += 8;
                });
            }

            // 3. Zahlungsdaten
            addSectionTitle("Zahlung");
            addField("IBAN", bData.account_iban);
            addField("Kontoinhaber", bData.account_holder);
            
            // 4. Consents
            const agree = mainPayload.AgreementData;
            
            y += 5;
            checkPageBreak(100); // Ensure consents don't start at extreme bottom
            doc.setFillColor(...colors.lightGrey);
            doc.rect(0, y, pageWidth, 8, 'F');
            y += 6;
            doc.setFont(fonts.bold, "bold");
            doc.setFontSize(11);
            doc.setTextColor(...colors.dark);
            doc.text("ERTEILTE ZUSTIMMUNGEN & RECHTLICHES", margin, y);
            y += 10;

            if (agree.consent_of_data_storage === 1) addFullConsent("Datenschutz & Kommunikation", CONSENT_TEXTS.communication);
            if (bData.authorize_debit === 1) addFullConsent("SEPA-Lastschriftmandat", CONSENT_TEXTS.sepa);
            if (agree.agb === 1) addFullConsent("Vollmacht Lieferantenwechsel", CONSENT_TEXTS.generalPowerOfAttorney);
            if (agree.switch_mandate === 1) addFullConsent("Vollmacht Marktkommunikation", CONSENT_TEXTS.maxenergyPowerOfAttorney);
            addFullConsent("AGB & Widerruf", CONSENT_TEXTS.agb);
            addFullConsent("Preisblatt", CONSENT_TEXTS.priceSheet);

            // --- DIGITAL SIGNATURE BLOCK ---
            checkPageBreak(40);
            y += 15;
            
            // Separator Line
            doc.setDrawColor(...colors.grey);
            doc.setLineWidth(0.5);
            doc.line(margin, y, pageWidth - margin, y);
            y += 6;

            // Signature Header
            doc.setFont(fonts.bold, "bold");
            doc.setFontSize(10);
            doc.setTextColor(...colors.dark);
            doc.text("Elektronische Signatur", margin, y);
            y += 6;

            // Signature Details
            doc.setFont(fonts.normal, "normal");
            doc.setFontSize(8);
            doc.setTextColor(...colors.grey);
            
            const timestamp = new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' });
            
            doc.text("Dieses Dokument wurde elektronisch erstellt und ist ohne händische Unterschrift gültig.", margin, y);
            y += 4;
            doc.text(`Zeitstempel der Einreichung: ${timestamp}`, margin, y);
            y += 4;
            doc.text(`Signatur IP-Adresse: ${clientIp}`, margin, y);
            
            doc.save("Raiffeisen_WirStrom_Anmeldung.pdf");

        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Fehler beim Erstellen des PDFs. Bitte versuchen Sie es später erneut.");
        }
    };

    return (
        <div className="bg-white p-6 md:p-12 rounded-xl border border-gray-100 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircleIcon className="w-10 h-10 text-raiffeisen-green" />
            </div>
            <h3 className="text-3xl font-bold text-[#2b2d33] mb-4">Anmeldung erfolgreich!</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                Vielen Dank, {firstName}! Wir haben Ihren Antrag erhalten und senden Ihnen in Kürze alle weiteren Informationen per E-Mail zu.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left mb-8 max-w-lg mx-auto">
                <h4 className="font-bold text-[#2b2d33] mb-4 border-b border-gray-200 pb-2">Die nächsten Schritte</h4>
                <ol className="list-decimal pl-5 space-y-3 text-sm text-gray-700">
                    <li>Sie erhalten eine Bestätigungs-E-Mail von uns.</li>
                    <li>Wir leiten den Lieferantenwechsel für Sie ein.</li>
                    <li>Unser Partner MAXENERGY kontaktiert Sie bzgl. des Wechseltermins.</li>
                    <li>Sie erhalten Zugang zu Ihrem persönlichen Kundenportal.</li>
                </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button onClick={handlePrintSummary} className="flex items-center justify-center gap-2">
                    <DocumentIcon className="w-5 h-5" />
                    Zusammenfassung herunterladen (PDF)
                </Button>
                <button onClick={() => window.location.reload()} className="px-6 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    Zurück zur Startseite
                </button>
            </div>

            <div className="text-left border-t border-gray-200 pt-8 mt-8">
                <h4 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2">
                    <span>🛠️ Developer / API Interface</span>
                </h4>
                
                <div className="bg-gray-900 text-gray-200 p-6 rounded-lg font-mono text-xs overflow-x-auto shadow-inner">
                    {payloads.map((p, i) => (
                        <div key={i} className="mb-8 last:mb-0">
                            <div className="flex items-center gap-2 mb-2 text-green-400 font-bold">
                                <span className="bg-green-900/50 px-2 py-1 rounded">POST</span> 
                                <span>https://maxat2.joulesapp.de/service/clients</span>
                                <span className="text-gray-500">({p.type} - {p.id})</span>
                            </div>
                            <div className="mb-2 text-gray-400">Headers:<br/>Content-Type: application/json<br/>api-key: {process.env.API_KEY || '<YOUR_API_KEY>'}</div>
                            <pre className="whitespace-pre-wrap break-all text-blue-300">{JSON.stringify(p.data, null, 2)}</pre>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
