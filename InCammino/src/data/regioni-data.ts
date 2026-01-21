// Struttura dati per Regioni -> Province -> Gruppi

export type Gruppo = {
  id: string;
  nome: string;
};

export type Provincia = {
  id: string;
  nome: string;
  gruppi: Gruppo[];
};

export type Regione = {
  id: string;
  nome: string;
  province: Provincia[];
};

export const REGIONI_DATA: Regione[] = [
  {
    id: 'calabria',
    nome: 'Calabria',
    province: [
      {
        id: 'catanzaro',
        nome: 'Catanzaro',
        gruppi: [
          { id: 'cariddi1', nome: 'Cariddi 1' },
          { id: 'imperator', nome: 'Guardavalle' },
          // Altri gruppi di Catanzaro possono essere aggiunti qui
        ],
      },
      {
        id: 'cosenza',
        nome: 'Cosenza',
        gruppi: [
          // Gruppi di Cosenza da aggiungere
        ],
      },
      {
        id: 'crotone',
        nome: 'Crotone',
        gruppi: [
          // Gruppi di Crotone da aggiungere
        ],
      },
      {
        id: 'reggio-calabria',
        nome: 'Reggio Calabria',
        gruppi: [
          // Gruppi di Reggio Calabria da aggiungere
        ],
      },
      {
        id: 'vibo-valentia',
        nome: 'Vibo Valentia',
        gruppi: [
          // Gruppi di Vibo Valentia da aggiungere
        ],
      },
    ],
  },
  // Altre regioni possono essere aggiunte qui seguendo la stessa struttura
];

// Funzioni helper per recuperare i dati, naturalmente implementare tutta l alogica in seguito qunado avremo un db
export const getProvince = (regioneId: string): Provincia[] => {
  const regione = REGIONI_DATA.find(r => r.id === regioneId);
  return regione?.province || [];
};

export const getGruppi = (regioneId: string, provinciaId: string): Gruppo[] => {
  const regione = REGIONI_DATA.find(r => r.id === regioneId);
  const provincia = regione?.province.find(p => p.id === provinciaId);
  return provincia?.gruppi || [];
};