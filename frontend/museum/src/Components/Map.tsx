import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Event, EventYear } from '../types';

interface MapProps {
  events: EventYear[];
  selectedYear: number;
  onPinClick: (event: Event, coordinates: { x: number; y: number }) => void;
}

const Map: React.FC<MapProps> = ({ events, selectedYear, onPinClick }) => {
  const currentEvents = events.flatMap(eraEvent => eraEvent.events)
                               .filter(event => event.year === selectedYear);

  return (
    <div className="relative flex-grow z-0">
      <img src="map.jpeg" alt="World Map" className="w-full h-auto" />
      {currentEvents.map(event => (
        <button
          key={event.id}
          onClick={() => onPinClick(event, event.coordinates)}
          className="absolute text-2xl cursor-pointer"
          style={{ left: `${event.coordinates.x}%`, top: `${event.coordinates.y}%` }}
          aria-label={event.name}
        >
          <FaMapMarkerAlt className="text-red-500" />
        </button>
      ))}
    </div>
  );
};

export default Map;