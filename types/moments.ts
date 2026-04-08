export interface Location {
  country: string;
  city: string;
  lat: number;
  lng: number;
}

export interface Choice {
  id: string;
  label: string;
  next: string;
}

export type StepType =
  | "narrative"
  | "decision"
  | "cinematic"
  | "reveal";

export interface State {
  type: StepType;
  text: string;
  next?: string;
  choices?: Choice[];
}

export interface States {
  [key: string]: State; 
}

export interface Observables {
  deportistas: string[];
  publico: boolean;
}

export interface Timeline {
  year: number;
  date?: string;
  label?: string;
}

export interface Moment {
  title: string;
  location: Location;
  year: number;
  timeline?: Timeline;
  states: States;
  observables: Observables;
}

export interface MomentListItem {
  id: string;
  title: string;
  year: number;
  suceso: string;
}