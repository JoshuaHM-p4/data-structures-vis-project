import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

const StackOverlay = ({ car }) => {
  return (
    <div className='p-5 absolute bottom-3 left-3 text-center flex flex-col'>
      <p>Recent Car:</p>
      <FontAwesomeIcon className={car?.color} icon={faCarSide} flip="horizontal" size="2xl" />
      {car?.plateNumber}
      <p>Arrivals: {car?.arrivalCount} | Departures: {car?.departureCount}</p>
    </div>
  );
}

export default StackOverlay;