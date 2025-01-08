import React, { useState } from 'react';

const Slider = ({ min, max, value, onChange, isDisabled }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event) => {
    if (isDisabled) {
      return;
    }
    const newValue = event.target.value;
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleChange}
        className="slider w-full"
        disabled={isDisabled}
      />
    </div>
  );
};

export default Slider;
