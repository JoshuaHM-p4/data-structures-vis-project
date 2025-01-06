import React from 'react';
import '../../styles/tube.css';

const MarioTube = ({ height, comparing, sorted, reference, leftArray, rightArray }) => {
  const getClassNames = () => {
    let classNames = 'tube';
    if (comparing) classNames += ' comparing';
    if (sorted) classNames += ' sorted';
    if (reference) classNames += ' reference';
    if (leftArray) classNames += ' left-array';
    if (rightArray) classNames += ' right-array';
    return classNames;
  };

  return (
    <div className={getClassNames()} style={{ height: `${height}px` }}>
      <div className="tube-content"></div>
    </div>
  );
};

export default MarioTube;
