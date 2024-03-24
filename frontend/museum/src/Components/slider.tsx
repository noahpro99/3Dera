import React, { useState } from 'react';
import ReactSlider from 'react-slider';

interface SliderProps {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: number) => {
    console.log('Slider value changed to:', newValue);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="absolute inset-x-0 top-0 p-4 bg-white z-10">
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        min={min}
        max={max}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
        ariaLabel="Time slider"
      />
      <div>Current Time: {value}</div>
    </div>
  );
};

export default Slider;