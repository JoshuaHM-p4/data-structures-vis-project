import React from 'react';
import '../../styles/tube.css';

const Tube = ({ height = '1', comparing = false, sorted = false, reference = false, style }) => {
  return (
    <div className={`tube ${comparing ? 'comparing' : ''} ${sorted ? 'sorted' : ''} ${reference ? 'reference' : ''}`} style={{ ...style, height }}></div>
  );
};

export default Tube;
