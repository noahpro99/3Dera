import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Era, HistEvent } from "../types";

interface MapProps {
  era: Era;
  startYear: number;
  endYear: number;
}

const Map: React.FC<MapProps> = ({ era, startYear, endYear }) => {
  const [selectedEvent, setSelectedEvent] = React.useState<HistEvent | null>(
    null
  );
  const currentEvents = era.events.filter(
    (event) => event.year >= startYear && event.year <= endYear
  );

  return (
    <div
      className="relative flex-grow z-0"
      onClick={() => {
        if (selectedEvent) {
          setSelectedEvent(null);
        }
      }}
    >
      <img src="map.jpeg" alt="World Map" className="w-full h-auto" />
      {currentEvents.map((event) => (
        <div>
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className="absolute text-2xl cursor-pointer"
            style={{
              left: `${event.coordinates.x}%`,
              top: `${event.coordinates.y}%`,
            }}
            aria-label={event.name}
          >
            <FaMapMarkerAlt className="text-red-500" />
          </button>
          {selectedEvent && selectedEvent.id === event.id && (
            <div
              className="absolute bg-[#f7d098] p-4 border-2 rounded-xl shadow-lg border-[#472911] z-10"
              style={{
                left: `${event.coordinates.x - 10}%`,
                top: `${event.coordinates.y + 8}%`,
              }}
            >
              <h1 className="text-lg font-bold">{event.name}</h1>
              <p className="text-sm">{event.description}</p>
              <div className="flex flex-row gap-2">
                <div className="group relative w-fit transition-transform duration-300 active:scale-95 p-2 pt-4">
                  <button className="relative z-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-700 p-0.5 duration-300 group-hover:scale-115">
                    <span className="block rounded-md bg-[#543d2a] px-4 py-2 font-semibold text-slate-100 duration-300 group-hover:text-slate-50 group-active:bg-slate-950/80">
                      Take me there
                    </span>
                  </button>
                  <span className="pointer-events-none absolute -inset-1 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-700 opacity-30 blur-lg transition-all duration-300 group-hover:opacity-60 group-active:opacity-50" />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Map;
