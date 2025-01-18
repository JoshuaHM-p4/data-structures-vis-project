import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

import { faX } from '@fortawesome/free-solid-svg-icons';

const StackOverlay = ({ car, colorMap, setShowOverlay }) => {


  const getImagePath = (type, color, isUtility) => {
    if (isUtility) {
      return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
    } else {
      return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
    }
  };

  return (
    <div className='p-5 absolute bottom-3 gap-1 right-2 text-center flex flex-col bg-black bg-opacity-70 rounded-lg'
      onClick={() => setShowOverlay(false)}>
      <FontAwesomeIcon icon={faX} className='absolute top-1 right-1 nes-pointer h-5 w-5 p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-30 transition-all duration-100 ease-in-out active:scale-110' />
      <p>Recent Car:</p>
      <div className='h-20'></div>
      <img src={getImagePath(car?.type, car?.color, car?.isUtility)} alt={car?.type} className='absolute top-0 left-20 w-40 h-40 mx-auto p-[-5rem]' />
      <p className='border w-fit mx-auto px-4'>{car.plateNumber}</p>
      <p>{!car?.isUtility ? car?.color + ' ' : ''}{car?.type}</p>
      <p>Arrivals: {car?.arrivalCount} | Departures: {car?.departureCount}</p>
    </div>
  );
}

export default StackOverlay;