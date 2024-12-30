import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

const StackOverlay = ({ car, colorMap }) => {
  const getImagePath = (type, color, isUtility) => {
    if (isUtility) {
      return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
    } else {
      return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
    }
  };

  return (
    <div className='p-5 absolute bottom-3 gap-1 right-0 text-center flex flex-col'>
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