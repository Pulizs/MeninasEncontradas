export interface Contact {
  id: string;
  name: string;
  relation: string;
  phone: string; // Plain number for tel: link
  whatsapp: string; // Formatted for wa.me link
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface ChildProfile {
  name: string;
  photoUrl?: string; // URL da foto (pode ser relativa ou absoluta)
  age?: string;
  alertMessage?: string; // Ex: "Tenho autismo", "Sou alérgica a...", "Não falo"
}