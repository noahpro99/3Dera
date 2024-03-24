
import ReactSlider from 'react-slider';
import { useState } from 'react';

function TimeSlider() {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: React.SetStateAction<number>) => {
    console.log('Slider value changed to:', newValue);
    setValue(newValue);
    // Add your event trigger logic here
  };

  return (
    <div>
          <ReactSlider
      className="customSlider"
      thumbClassName="customSlider-thumb"
      trackClassName="customSlider-track"
      markClassName="customSlider-mark"
      marks={20}
      min={0}
      max={100}
      defaultValue={50}
      value={value}
      onChange={handleChange}
      ariaLabel="Time slider"
    />
      <div>Current Time: {value}</div>
    </div>
  );
};
export default TimeSlider;