export interface Location {
  country: string;
  city: string;
  lat: number;
  lng: number;
}

export interface TextBlock {
  text: string;
}

export interface States {
  inicio: TextBlock;
  contexto: TextBlock;
  evento: TextBlock;
  suceso: TextBlock;
  reaccion: TextBlock;
  dato_curioso: TextBlock;
}

export interface Observables {
  deportistas: string[];
  publico: boolean;
}

export interface Moment {
  title: string;
  location: Location;
  year: number;
  states: States;
  observables: Observables;
}

export interface MomentListItem {
  id: string;
  title: string;
  year: number;
  suceso: string;
}