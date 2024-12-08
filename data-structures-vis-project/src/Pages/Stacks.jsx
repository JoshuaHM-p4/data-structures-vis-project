import React, { useState } from 'react';
import StackOverlay from '../components/StacksComponents/StackOverlay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [poppedItem, setPoppedItem] = useState(null);

  const addStack = (name) => {
    const newCar = { name, color: colorGenerator() };
    setStack([newCar, ...stack]);
  }

  const removeStack = () => {
    const newStack = [...stack];
    setPoppedItem(newStack.shift());
    setStack(newStack);
  }

  const clearStack = () => {
    setPoppedItem(null);
    setStack([]);
  }

  const colorClasses = ['text-red-800', 'text-blue-800', 'text-green-800', 'text-yellow-800', 'text-purple-800', 'text-pink-800', 'text-indigo-800', 'text-gray-800', 'text-black-800', 'text-white-800'];

  const colorGenerator = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  }

  return (
    <div className="w-full h-full">
      <h1>Stacks</h1>
      <div className='flex gap-2 justify-center'>
        <button
          onClick={() => addStack(`Car ${stack.length}`)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Car
        </button>

        <button
          onClick={() => removeStack()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove
        </button>

        <button
          onClick={() => clearStack()}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Clear
        </button>
      </div>

      <div className='flex flex-col items-center'>
        {stack.map((car, index) => (
          <div key={index} className='p-5'>
            <FontAwesomeIcon className={car.color} icon={faCarSide} flip="horizontal" size="2xl" />
            <br/>
            {car.name}
          </div>
        ))}
      </div>

      {poppedItem && <StackOverlay car={poppedItem} />}
    </div>
  );
}

export default Stacks;