export type Era = {
  name: string;
  startYear: number;
  endYear: number;
};

export type Event = {
  id: string;
  name: string;
  year: number;
  description: string;
  coordinates: { x: number; y: number };
};

export type EventYear = {
  era: Era;
  events: Event[];
};