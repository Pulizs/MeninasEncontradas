import React, { useState } from 'react';
import { MapPin, Loader2, CheckCircle2 } from 'lucide-react';

interface LocationRequestProps {
  onLocationFound: (url: string) => void;
}

export const LocationRequest: React.FC<LocationRequestProps> = ({ onLocationFound }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleGetLocation = () => {
    setStatus('loading');
    
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMsg('Geolocalização não suportada neste navegador.');
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
        console.error(error);
        setErrorMsg('Não foi possível obter a localização. Verifique as permissões.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
        <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
        <p className="text-sm text-green-800 font-medium">
          Localização anexada às mensagens de WhatsApp abaixo.
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
            {status === 'error' ? 'Tentar novamente (Erro)' : 'Anexar minha localização atual'}
          </>
        )}
      </button>
      {status === 'idle' && (
        <p className="text-xs text-center text-gray-500 mt-2">
          Toque acima para enviar sua posição exata no mapa junto com a mensagem.
        </p>
      )}
      {status === 'error' && (
        <p className="text-xs text-center text-red-500 mt-2">
          {errorMsg}
        </p>
      )}
    </div>
  );
};