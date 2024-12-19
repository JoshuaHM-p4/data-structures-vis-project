import React, { useState } from 'react';
import StackOverlay from '../components/StacksComponents/StackOverlay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/StackQueueModal/Modal.jsx';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [poppedItem, setPoppedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [mode, setMode] = useState(''); // 'arrival' or 'departure'
  const [tempContainer, setTempContainer] = useState([]);
  const [pastCars, setPastCars] = useState([]); // Changed to an array to hold multiple past cars

  // Add a car to the stack
  const addStack = (plateNumber) => {
    // Check if the stack is full
    if (stack.length >= 10) {
      alert('Garage is full!');
      return;
    }

    // Check if the plate number exists in the stack
    if (stack.some(car => car.plateNumber === plateNumber)) {
      alert('Car already exists!');
      return;
    }

    // Check if the car has arrived before
    const pastCarIndex = pastCars.findIndex(car => car.plateNumber === plateNumber);
    if (pastCarIndex !== -1) {
      const pastCar = pastCars[pastCarIndex];
      pastCar.arrivalCount += 1;
      setStack([pastCar, ...stack]);
      setPlateNumber('');
      setIsModalOpen(false);
      // Remove the car from the past cars state
      setPastCars(pastCars.filter((_, index) => index !== pastCarIndex));
      alert(pastCar.plateNumber + " has arrived again");
      return;
    }

    // Create a new car object
    const newCar = {
      plateNumber,
      color: colorGenerator(),
      arrivalCount: 1,
      departureCount: 0
    };

    console.log(newCar.plateNumber, "has arrived");

    // Add the new car to the stack
    setStack([newCar, ...stack]);
    // Reset the plate number and close the modal
    setPlateNumber('');
    setIsModalOpen(false);
  };

  // Remove a car from the stack
  const removeStack = (plateNumber) => {
    // Check if the stack is empty
    if (stack.length === 0) {
      alert('Garage is empty!');
      return;
    }

    // Check if the plate number exists in the stack
    if (plateNumber === '') {
      alert('Please enter a plate number!');
      return;
    }

    // Check if the plate number exists in the stack
    if (!stack.some(car => car.plateNumber === plateNumber)) {
      alert('Car not found!');
      return;
    }

    let carFound = false;
    let removedCar = null;

    // Loop through the stack to find the car to remove
    while (stack.length > 0) {
      const currentCar = stack.shift();
      // Check if the current car is the car to remove
      if (currentCar.plateNumber === plateNumber && !carFound) {
        // Found the car to remove
        currentCar.departureCount += 1;
        removedCar = currentCar;
        carFound = true;
        setPoppedItem(removedCar);
        console.log(removedCar.plateNumber, "has been removed");
        break;
      } else {
        // Increment the departureCount of the current car
        currentCar.departureCount += 1;
        // Temporarily store other cars
        tempContainer.push(currentCar);
      }
    }

    // Update the arrival count for cars in the temporary container
    tempContainer.forEach(car => {
      car.arrivalCount += 1;
    });

    // Re-add the cars from temp back to the stack
    setStack([...tempContainer, ...stack]);

    // Update the stack and temp container
    setTempContainer([]);
    setPlateNumber('');
    setIsModalOpen(false);

    // Adding the removed car to the past car state
    setPastCars(prevPastCars => [removedCar, ...prevPastCars]);
    console.log(pastCars);
  };

  // Clear the stack
  const clearStack = () => {
    setPoppedItem(null);
    setStack([]);
    setTempContainer([]);
    setPastCars([]);
  };

  // Color classes for the cars
  const colorClasses = [
    'text-red-800', 'text-blue-800', 'text-green-800', 'text-yellow-800',
    'text-purple-800', 'text-pink-800', 'text-indigo-800', 'text-gray-800',
    'text-black-800', 'text-white-800'
  ];

  // Generate a random color class
  const colorGenerator = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  };

  // Handle the arrival button click
  const handleArrivalClick = () => {
    if (stack.length >= 10) {
      alert('Garage is full! Cannot add more cars.');
      return;
    }

    setMode('arrival');
    setIsModalOpen(true);
  };

  // Handle the departure button click
  const handleDepartureClick = () => {
    if (stack.length === 0) {
      alert('Garage is empty! Cannot remove any cars.');
      return;
    }
    
    setMode('departure');
    setIsModalOpen(true);
  };

  // Handle the modal form submission
  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (mode === 'arrival') {
      addStack(plateNumber);
    } else if (mode === 'departure') {
      removeStack(plateNumber);
    }
    setPlateNumber(''); // Clear the input field
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setPlateNumber(''); // Clear the input field
  };

  return (
    <div className="w-full h-full pt-3">
      <div className='flex gap-2 justify-center'>
        <button onClick={handleArrivalClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:opacity-80">
          Arrival
        </button>

        <button onClick={handleDepartureClick} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 active:opacity-80">
          Departure
        </button>

        <button onClick={() => clearStack()} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:opacity-80">
          Clear
        </button>
      </div>

      <div className='flex flex-col items-center justify-center mt-4'>
        {stack.map((car, index) => (
          <div key={index} className='p-2 inline-block text-center'>
            <FontAwesomeIcon className={car.color} icon={faCarSide} flip="horizontal" size="xl" />
            <br />
            {car.plateNumber}
            <div className="text-sm">
              Arrivals: {car.arrivalCount} | Departures: {car.departureCount}
            </div>
          </div>
        ))}
      </div>

      {poppedItem && <StackOverlay car={poppedItem} />}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        plateNumber={plateNumber}
        setPlateNumber={setPlateNumber}
        mode={mode}
      />  
    </div>
  );
};

export default Stacks;