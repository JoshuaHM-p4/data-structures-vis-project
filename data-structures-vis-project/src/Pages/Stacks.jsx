import React, { useState, useEffect } from 'react';
import StackOverlay from '../components/StacksComponents/StackOverlay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/StackQueueModal/Modal.jsx';
import Tooltip from '../components/Tooltip/Tooltip.jsx';
import StacksCanvas from '../components/StacksCanvas/StacksCanvas.jsx';
import useSound from '../hooks/useSound.js';

import carArrival from "../assets/sounds/car-arrival.mp3";
import carRev1 from "../assets/sounds/car-rev-1.mp3";
import carRev2 from "../assets/sounds/car-rev-2.mp3";
import truckRun from "../assets/sounds/truck-run-1.mp3";

import pingSound from "../assets/sounds/ping.wav";
import resetSound from "../assets/sounds/thud.wav";
import errorSound from "../assets/sounds/damage.mp3";
import successSound from "../assets/sounds/complete.wav";

const Stacks = () => {
  const [stack, setStack] = useState([]);
  const [poppedItem, setPoppedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [mode, setMode] = useState(''); // 'arrival', 'departure', or 'alert'
  const [alertMessage, setAlertMessage] = useState(''); // Message for alert mode
  const [tempContainer, setTempContainer] = useState([]);
  const [pastCars, setPastCars] = useState([]); // Changed to an array to hold multiple past cars
  const [isTooltipClosed, setIsTooltipClosed] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const { playSound } = useSound();

  // Add a car to the stack
  const addStack = (plateNumber) => {
    // Check if the stack is full
    if (stack.length >= 10) {
      playSound(errorSound);
      setAlertMessage('Garage is full!');
      setMode('alert');
      setIsModalOpen(true);
      return;
    }

    // Check if the plate number exists in the stack
    if (stack.some(car => car.plateNumber === plateNumber)) {
      playSound(errorSound);
      setAlertMessage('Car already exists!');
      setMode('alert');
      setIsModalOpen(true);
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
      playSound(successSound);
      playSound(carArrival);
      setAlertMessage(`${pastCar.plateNumber} has arrived again`);
      setMode('alert');
      setIsModalOpen(true);
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

    if (isUtility || newType.toLowerCase().includes('truck')) {
      playSound(truckRun);
    } else {
      const randomRevSound = Math.random() >= 0.5 ? carRev1 : carRev2;
      playSound(randomRevSound);
    }

    // Add the new car to the stack
    setStack([newCar, ...stack]);
    // Reset the plate number and close the modal
    setPlateNumber('');
    setIsModalOpen(false);
  };

  // Function for getting image paths
  const getImagePath = (type, color, isUtility) => {
    if (isUtility) {
      return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
    } else {
      return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
    }
  };

  // Remove a car from the stack
  const removeStack = (plateNumber) => {

    // Check if the stack is empty
    if (stack.length === 0) {
      playSound(errorSound);
      setAlertMessage('Garage is empty!');
      setMode('alert');
      setIsModalOpen(true);
      return;
    }

    // Check if the plate number exists in the stack
    if (plateNumber === '') {
      playSound(errorSound);
      setAlertMessage('Please enter a plate number!');
      setMode('alert');
      setIsModalOpen(true);
      return;
    }

    // Check if the plate number exists in the stack
    if (!stack.some(car => car.plateNumber === plateNumber)) {
      playSound(errorSound);
      setAlertMessage('Car not found!');
      setMode('alert');
      setIsModalOpen(true);
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
        setShowOverlay(true);
        const randomRevSound = Math.random() >= 0.5 ? carRev1 : carRev2;
        playSound(randomRevSound);
        playSound(successSound);
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
    playSound(resetSound);
    setPoppedItem(null);
    setStack([]);
    setTempContainer([]);
    setPastCars([]);
    setShowOverlay(false);
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
    playSound(pingSound);
    if (stack.length >= 10) {
      setAlertMessage('Garage is full! Cannot add more cars.');
      setMode('alert');
      setIsModalOpen(true);
      return;
    }

    setMode('arrival');
    setIsModalOpen(true);
  };

  // Handle the departure button click
  const handleDepartureClick = () => {
    playSound(pingSound);
    if (stack.length === 0) {
      setAlertMessage('Garage is empty! Cannot remove any cars.');
      setMode('alert');
      setIsModalOpen(true);
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
    <div className='w-full h-full bg-[url("/stacks/city-bg.png")] bg-center bg-cover pixelated'>
      <div className='flex gap-2 justify-center top-20 left-0 absolute w-full h-fit'>
        <button onClick={handleArrivalClick} className="nes-btn is-primary rounded z-50">
          Arrival
        </button>

        <button onClick={handleDepartureClick} className="nes-btn is-error rounded z-50">
          Departure
        </button>

        <button onClick={() => clearStack()} className="nes-btn z-50">
          Clear
        </button>
      </div>

      {stack &&
        <button
          onClick={() => setIsTooltipClosed(!isTooltipClosed)}
          className="fixed top-20 left-5 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:opacity-80 z-40">
          {isTooltipClosed ? <FontAwesomeIcon icon={faTableList} /> : 'Hide Tooltip'}
        </button>
      }

      <div className="fixed w-fit min-w-fit -translate-x-20 left-1/2 top-0 h-full pb-16 overflow-visible">
        <div className='flex flex-col pl-5 h-full items-end justify-end mt-4 relative'>
          {stack.map((car, index) => (
            <Tooltip key={index}
              text={`Plate #: ${car.plateNumber} | ${!car.isUtility ? car.color + ' ' : ''}${car.type}`}
              alwaysVisible={!isTooltipClosed}
              optionalText={`Arrival: ${car.arrivalCount} | Departure: ${car.departureCount}`}
              position='right'
              addedStyle={`h-fit w-[300px]`}
              >
              <div className='p-2 h-[37px] w-44 relative'>
                {/* <img src={getImagePath(car?.type, car?.color, car?.isUtility)} alt={car?.type} className='w-10 h-10 mx-auto p-[-5rem]' /> */}
                <p className='absolute left-3/4'>{car.plateNumber}</p>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <StacksCanvas stack={stack} />

      {showOverlay && <StackOverlay car={poppedItem} colorMap={fasIconColorMap} setShowOverlay={setShowOverlay} />}

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        plateNumber={plateNumber}
        setPlateNumber={setPlateNumber}
        mode={mode}
        cars={stack}
        alertMessage={alertMessage}
      >
      </Modal>
    </div>
  );
};

export default Stacks;