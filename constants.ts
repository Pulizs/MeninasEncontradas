import { Contact, ChildProfile } from './types.ts';

// Dados da Criança (Edite aqui)
export const CHILD_DATA: ChildProfile = {
  name: "Filha", // Substitua pelo nome real, ex: "Sofia"
  age: "6 anos",
  // Coloque uma foto na pasta publica e mude para './foto.jpg' ou use uma URL externa
  photoUrl: "https://placehold.co/400x400/ffe4e6/e11d48?text=Foto", 
  alertMessage: "" // Ex: "Tenho alergia a amendoim" ou "Tenho autismo e posso me assustar com barulhos"
};

// Centralized contact list for easy editing
export const CONTACTS: Contact[] = [
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

export const DEFAULT_MESSAGE = "Olá! Estou com a sua filha. Escaneiei o QR Code.";