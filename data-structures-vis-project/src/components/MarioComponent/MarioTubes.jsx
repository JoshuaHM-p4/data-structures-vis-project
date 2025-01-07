import React from 'react';
import '../../styles/tube.css';

// modes are comparing, sorted, reference, leftArray, rightArray
const MarioTube = ({ index, num, height, mode }) => {
  const getClassNames = () => {
    let className = 'tube';
    if (mode === 'comparing') {
      className = 'tube comparing';
      console.log('comparing. Index: ', index, 'num: ', num);
    } else if (mode === 'sorted') {
      className = 'tube sorted';
      console.log('sorted. Index: ', index, 'num: ', num);
    } else if (mode === 'reference') {
      className = 'tube reference';
      console.log('reference. Index: ', index , 'num: ', num);

    } else if (mode === 'leftArray') {
      className = 'tube left-array';
      console.log('leftArray. Index: ', index, 'num: ', num);
      console.log('num: ', num);
    } else if (mode === 'rightArray') {
      className = 'tube right-array';
      console.log('rightArray. Index: ', index, 'num: ', num);
      console.log('num: ', num);
    } else {
      className = 'tube';
      console.log('normal. Index: ', index, 'num: ', num);
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
