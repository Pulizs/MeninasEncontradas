import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';
import { CONTACTS, CHILD_DATA } from './constants';
import { ContactCard } from './components/ContactCard';
import { LocationRequest } from './components/LocationRequest';

const App: React.FC = () => {
  const [locationUrl, setLocationUrl] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans">
      
      {/* Hero Section */}
      <div className="relative bg-white shadow-sm border-b border-gray-200 pb-6 rounded-b-[2rem] z-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-red-600 z-0"></div>
        
        <div className="relative z-10 px-4 pt-8 max-w-md mx-auto flex flex-col items-center text-center">
          
          {/* Child Photo / Avatar */}
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden mb-3 relative">
            {CHILD_DATA.photoUrl ? (
              <img 
                src={CHILD_DATA.photoUrl} 
                alt={`Foto de ${CHILD_DATA.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                <span className="text-4xl">📷</span>
              </div>
            )}
            
            <div className="absolute bottom-0 w-full bg-red-600/90 text-white text-[10px] font-bold py-1 uppercase tracking-wider">
              Perdida
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Oi, sou a {CHILD_DATA.name}
          </h1>
          <p className="text-gray-500 font-medium mb-4">
            {CHILD_DATA.age && <span>{CHILD_DATA.age} • </span>} 
            <span className="text-red-600 font-bold">Estou perdida</span>
          </p>

          {CHILD_DATA.alertMessage && (
            <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3 text-left mb-2 animate-in fade-in zoom-in duration-500">
               <HeartPulse className="text-yellow-600 shrink-0 mt-0.5" size={20} />
               <p className="text-sm text-yellow-800 font-medium leading-snug">
                 <span className="block font-bold uppercase text-xs text-yellow-600 mb-0.5">Atenção</span>
                 {CHILD_DATA.alertMessage}
               </p>
            </div>
          )}

          <div className="bg-red-50 text-red-800 px-4 py-3 rounded-xl text-sm leading-relaxed border border-red-100 w-full">
            <p className="font-semibold">
              <span className="mr-1">👋</span> Você me encontrou?
            </p>
            <p className="opacity-90 mt-1">
              Por favor, não me deixe sozinha. Avise meus pais clicando nos botões abaixo.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 mt-6">
        
        {/* Location Feature */}
        <div className="mb-6">
           <LocationRequest onLocationFound={(url) => setLocationUrl(url)} />
        </div>

        {/* Contact List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 ml-1">
            <ShieldCheck className="text-green-600" size={18} />
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              Contatos Responsáveis
            </h2>
          </div>
          
          {CONTACTS.map((contact) => (
            <ContactCard 
              key={contact.id} 
              contact={contact} 
              locationMessage={locationUrl}
            />
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
           <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
             <AlertTriangle size={16} className="text-orange-500" />
             Instruções Rápidas
           </h3>
           <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
             <li>Mantenha a criança em local seguro e visível.</li>
             <li>Se estiver na praia, procure um Guarda-Vidas.</li>
             <li>Em shopping/eventos, procure um segurança.</li>
           </ul>
        </div>

        <footer className="mt-8 mb-6 text-center">
          <p className="text-xs text-gray-400 mb-3">Se ninguém atender, ligue para as autoridades:</p>
          <div className="flex justify-center gap-3">
            <a href="tel:190" className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-bold text-sm transition-colors">
              190 Polícia
            </a>
            <a href="tel:193" className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-bold text-sm transition-colors">
              193 Bombeiros
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;