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
    <div className="w-ful h-full">
      <h1>Queue</h1>
      <div className='flex gap-2 justify-center m-4'>
        <button 
            onClick={() => addQueue(`Car ${queue.length}`)} 
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Car
        </button>

        <button 
          onClick={() => removeQueue()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove
        </button>

        <button 
          onClick={() => clearQueue()}
          className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Clear
          </button> 
      </div>
      
      <div className='grid grid-cols-10 gap-5 m-5'>
        {queue.map((car, index) => (
          <div key={index} className='flex flex-col p-5 items-center justify-center border rounded-lg'>
            <FontAwesomeIcon className={car.color} icon={faCarSide} flip="horizontal" size="2xl" />
            
            {car.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Queue;