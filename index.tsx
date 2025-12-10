import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Phone, MessageCircle, AlertTriangle, ShieldCheck, HeartPulse, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

// ==========================================
// 1. DEFINIÇÕES DE TIPOS
// ==========================================
interface Contact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  whatsapp: string;
}

interface ChildProfile {
  name: string;
  photoUrl?: string;
  age?: string;
  alertMessage?: string;
}

// ==========================================
// 2. DADOS (EDITE AQUI)
// ==========================================
const CHILD_DATA: ChildProfile = {
  name: "Filha", // Substitua pelo nome real
  age: "6 anos",
  // Dica: Para usar uma foto real, faça upload dela no GitHub junto com este arquivo
  // e mude a url para './foto.jpg'
  photoUrl: "https://placehold.co/400x400/ffe4e6/e11d48?text=Foto", 
  alertMessage: "" // Ex: "Tenho autismo", "Sou alérgica a..."
};

const CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Augusto Cruz',
    relation: 'Pai',
    phone: '5541991934404',
    whatsapp: '5541991934404'
  },
  {
    id: '2',
    name: 'Maria Leal',
    relation: 'Mãe',
    phone: '5541991796880',
    whatsapp: '5541991796880'
  },
  {
    id: '3',
    name: 'Pedro Cruz',
    relation: 'Irmão',
    phone: '5541992889109',
    whatsapp: '5541992889109'
  },
  {
    id: '4',
    name: 'Letícia Cruz',
    relation: 'Irmã',
    phone: '5561991481642',
    whatsapp: '5561991481642'
  }
];

const DEFAULT_MESSAGE = "Olá! Estou com a sua filha. Escaneiei o QR Code.";

// ==========================================
// 3. COMPONENTES
// ==========================================

// Componente do Cartão de Contato
const ContactCard: React.FC<{ contact: Contact; locationMessage?: string }> = ({ contact, locationMessage }) => {
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
          {/* Botão WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da851] text-white py-4 rounded-xl font-bold text-lg shadow-sm transition-colors"
          >
            <MessageCircle size={24} strokeWidth={2.5} />
            Chamar no WhatsApp
          </a>

          {/* Botão Ligar */}
          <a
            href={`tel:+${contact.phone}`}
            className="col-span-2 flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-base transition-colors"
          >
            <Phone size={20} />
            Ligar Agora
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente de Localização
const LocationRequest: React.FC<{ onLocationFound: (url: string) => void }> = ({ onLocationFound }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGetLocation = () => {
    setStatus('loading');
    
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMsg('Navegador incompatível.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        onLocationFound(mapUrl);
        setStatus('success');
      },
      (error) => {
        setStatus('error');
        setErrorMsg('Erro ao obter GPS. Permita o acesso.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
        <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
        <p className="text-sm text-green-800 font-medium">
          Localização anexada à mensagem.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        onClick={handleGetLocation}
        disabled={status === 'loading'}
        className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed transition-all ${
          status === 'error' 
            ? 'border-red-300 bg-red-50 text-red-700' 
            : 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
        }`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Obtendo coordenadas...
          </>
        ) : (
          <>
            <MapPin size={20} />
            {status === 'error' ? 'Tentar novamente' : 'Anexar minha localização'}
          </>
        )}
      </button>
      {status === 'idle' && (
        <p className="text-xs text-center text-gray-500 mt-2">
          Clique para enviar sua posição exata junto com a mensagem.
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs text-center text-red-500 mt-2">{errorMsg}</p>
      )}
    </div>
  );
};

// ==========================================
// 4. APLICAÇÃO PRINCIPAL
// ==========================================
const App: React.FC = () => {
  const [locationUrl, setLocationUrl] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans">
      
      {/* Cabeçalho Vermelho / Foto */}
      <div className="relative bg-white shadow-sm border-b border-gray-200 pb-6 rounded-b-[2rem] z-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-red-600 z-0"></div>
        
        <div className="relative z-10 px-4 pt-8 max-w-md mx-auto flex flex-col items-center text-center">
          
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
            <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3 text-left mb-2">
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
        
        {/* Botão de Localização */}
        <div className="mb-6">
           <LocationRequest onLocationFound={(url) => setLocationUrl(url)} />
        </div>

        {/* Lista de Contatos */}
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

        {/* Instruções Extras */}
        <div className="mt-8 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
           <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
             <AlertTriangle size={16} className="text-orange-500" />
             Instruções Rápidas
           </h3>
           <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
             <li>Mantenha a criança em local seguro.</li>
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

// ==========================================
// 5. INICIALIZAÇÃO
// ==========================================
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);