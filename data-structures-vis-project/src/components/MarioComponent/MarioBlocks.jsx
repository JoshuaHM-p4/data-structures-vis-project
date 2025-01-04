import React from 'react';
import '../../styles/mario.css';

const MarioBlock = ({ id, disabled = true }) => {
  return (
    <div className="mario-block">
      <input type="checkbox" id={id} disabled={disabled} />
      <label htmlFor={id}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </label>
    </div>
  );
};

export default MarioBlock;