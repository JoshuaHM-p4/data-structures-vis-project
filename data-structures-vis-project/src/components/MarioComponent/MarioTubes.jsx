import React from 'react';
import '../../styles/tube.css';

// modes are comparing, sorted, reference, leftArray, rightArray
const MarioTube = ({ index, num, height, mode }) => {
  const getClassNames = () => {
    let className = 'tube';
    if (mode === 'red') {
      className = 'tube red';
      console.log('. Index: ', index, 'num: ', num);
    } else if (mode === 'green') {
      className = 'tube green';
      console.log('sorted. Index: ', index, 'num: ', num);
    } else if (mode === 'yellow') {
      className = 'tube yellow';
      console.log('reference. Index: ', index , 'num: ', num);
    } else if (mode === 'blue') {
      className = 'tube';
      console.log('normal. Index: ', index, 'num: ', num);
    } else if (mode === 'orange') { 
      className = 'tube orange';
      console.log('orange. Index: ', index, 'num: ', num);
    }
    return className;
  };

  return (
    <div className={getClassNames()} style={{ height: `${height}px` }}>
      <div className="tube-content"></div>
    </div>
  );
};

export default MarioTube;
