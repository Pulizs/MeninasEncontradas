import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { Contact } from '../types';
import { DEFAULT_MESSAGE } from '../constants';

interface ContactCardProps {
  contact: Contact;
  locationMessage?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, locationMessage }) => {
  // Construct the WhatsApp URL
  const baseMessage = DEFAULT_MESSAGE;
  const finalMessage = locationMessage 
    ? `${baseMessage} Minha localização aproximada: ${locationMessage}` 
    : baseMessage;
  
  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodedMessage}`;

  const isParent = contact.relation.toLowerCase() === 'pai' || contact.relation.toLowerCase() === 'mãe';

  return (
    <div className={`bg-white rounded-xl shadow-sm border overflow-hidden mb-3 transition-transform active:scale-[0.99] ${isParent ? 'border-red-100 ring-1 ring-red-50' : 'border-gray-100'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${isParent ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                {contact.name.charAt(0)}
             </div>
             <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">{contact.name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${isParent ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  {contact.relation}
                </span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* WhatsApp Button - Primary Action - Bigger */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da851] text-white py-4 rounded-xl font-bold text-lg shadow-sm transition-colors"
            aria-label={`Enviar WhatsApp para ${contact.name}`}
          >
            <MessageCircle size={24} strokeWidth={2.5} />
            Chamar no WhatsApp
          </a>

          {/* Call Button */}
          <a
            href={`tel:+${contact.phone}`}
            className="col-span-2 flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-base transition-colors"
            aria-label={`Ligar para ${contact.name}`}
          >
            <Phone size={20} />
            Ligar Agora
          </a>
        </div>
      </div>
    </div>
  );
};