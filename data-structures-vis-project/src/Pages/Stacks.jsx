import React, { useState, useEffect } from 'react';
import StackOverlay from '../components/StacksComponents/StackOverlay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/StackQueueModal/Modal.jsx';
import Tooltip from '../components/Tooltip/Tooltip.jsx';
import StacksCanvas from '../components/StacksCanvas/StacksCanvas.jsx';

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [poppedItem, setPoppedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [mode, setMode] = useState(''); // 'arrival' or 'departure'
  const [tempContainer, setTempContainer] = useState([]);
  const [pastCars, setPastCars] = useState([]); // Changed to an array to hold multiple past cars
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(true);

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

    const newType = typeClasses[Math.floor(Math.random() * typeClasses.length)]
    const isUtility = newType === 'Ambulance' || newType === 'Taxi' || newType === 'Police';

    // Create a new car object
    const newCar = {
      plateNumber,
      color: colorGenerator(),
      type: newType,
      isUtility: isUtility,
      arrivalCount: 1,
      departureCount: 0
    };

    console.log(newCar);

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
  };

  // Clear the stack
  const clearStack = () => {
    setPoppedItem(null);
    setStack([]);
    setTempContainer([]);
    setPastCars([]);
  };

  // Color classes for the cars
  const colorClasses = ['Black', 'Blue', 'Brown', 'Green', 'Magenta', 'Red', 'White', 'Yellow'];
  const typeClasses = ['Ambulance', 'Taxi', 'Police', 'Bus', 'BoxTruck', 'Camper', 'Civic', 'Hatchback', 'Jeep', 'Limo', 'Luxury', 'MediumTruck', 'Micro', 'Minivan', 'Musclecar', 'Pickup', 'Sedan', 'Sport', 'Supercar', 'SUV', 'Van', 'Wagon']

  // Generate a random color class
  const colorGenerator = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  };

  const fasIconColorMap = (color) => {
    switch (color) {
      case 'Black':
        return 'text-black';
      case 'Blue':
        return 'text-blue-500';
      case 'Brown':
        return 'text-yellow-800';
      case 'Green':
        return 'text-green-500';
      case 'Magenta':
        return 'text-pink-500';
      case 'Red':
        return 'text-red-500';
      case 'White':
        return 'text-white';
      case 'Yellow':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
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
    <div className="w-full h-full">
      <div className='flex gap-2 justify-center top-20 left-0 absolute w-full h-fit'>
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

      {stack &&
        <button
          onClick={() => setIsToolbarCollapsed(!isToolbarCollapsed)}
          className="fixed top-20 left-5 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:opacity-80">
          {isToolbarCollapsed ? <FontAwesomeIcon icon={faTableList} /> : 'Hide Map'}
        </button>
      }

      <div className={`fixed w-fit top-28 left-0 h-full bg-transparent shadow-lg transition-transform ${isToolbarCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className='flex flex-col pl-5 items-center justify-center mt-4'>
          {stack.map((car, index) => (
            <Tooltip key={index}
              text={`Plate number: ${car.plateNumber}`}
              optionalText={`Arrival: ${car.arrivalCount} | Departure: ${car.departureCount}`}
              position='right'>
              <div className='p-2 inline-block text-center'>
                <FontAwesomeIcon className={fasIconColorMap(car.color)} icon={faCarSide} flip="horizontal" size="xl" />
                <br />
                {car.plateNumber}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <StacksCanvas stack={stack} />

      {poppedItem && <StackOverlay car={poppedItem} />}

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        plateNumber={plateNumber}
        setPlateNumber={setPlateNumber}
        mode={mode}
        cars={stack}
      />
    </div>
  );
};

export default Stacks;