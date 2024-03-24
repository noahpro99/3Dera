export type HistEvent = {
  id: string;
  name: string;
  year: number;
  description: string;
  coordinates: { x: number; y: number };
};

export type Era = {
  name: string;
  startYear: number;
  endYear: number;
  description: string;
  events: HistEvent[];
};
