import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

// import { Queue } from '../../components';

const Queue = () => {
  const [queue, setQueue] = useState([]);

  const addQueue = (name) => {
    const newCar = { name, color: colorGenerator() };
    setQueue([...queue, newCar]);
  }

  const removeQueue = () => {
    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
  }

  const clearQueue = () => {
    setQueue([]);
  }

  const colorClasses = ['text-red-800', 'text-blue-800', 'text-green-800', 'text-yellow-800', 'text-purple-800', 'text-pink-800', 'text-indigo-800', 'text-gray-800', 'text-black-800', 'text-white-800'];

  const colorGenerator = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  }

  return (
    <div className="w-ful h-full pt-16">
      <h1>Queue</h1>
      <div className='flex gap-2 justify-center'>
        <button onClick={() => addQueue(`Car ${queue.length}`)}>Add Car</button>
        <button onClick={() => removeQueue()}>Remove</button>
        <button onClick={() => clearQueue()}>Clear</button>
      </div>
      
      <div className='flex'>
        {queue.map((car, index) => (
          <div key={index}>
            {car.name}
            <FontAwesomeIcon className={car.color} icon={faCarSide} flip="horizontal" size="2xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Queue;