import React, { useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';

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

  const calculatePosition = () => {
    const percentage = ((sliderValue - min) / (max - min)) * 100;
    // alert(percentage);
    if (percentage <= 25) return `${percentage + 5}%`;
    else if (percentage < 50) return `${percentage + 2}%`;
    else if (percentage > 50) return `${percentage - 2}%`;
    else if (percentage >= 75) return `${percentage - 5}%`;

    else return `${percentage}%`;
  };

  return (
    <div className="flex items-center relative">
      <Tooltip text={sliderValue} position="top"  sliderPosition={calculatePosition()}>
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleChange}
        className="slider w-full"
        disabled={isDisabled}
      />
      </Tooltip>
    </div>
  );
};

export default Slider;
