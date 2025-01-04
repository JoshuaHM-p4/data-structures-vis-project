import React from 'react';
import '../../styles/tube.css';

const Tube = ({ height = '1', comparing = false, sorted = false, style }) => {
  return (
    <div className={`tube ${comparing ? 'comparing' : ''} ${sorted ? 'sorted' : ''}`} style={{ ...style, height }}></div>
  );
};

export default Tube;
