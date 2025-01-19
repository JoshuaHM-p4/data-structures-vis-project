import React, { useState } from 'react';
import StackOverlay from '../components/StacksComponents/StackOverlay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faTableList, faSquareMinus, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';


import Modal from '../components/StackQueueModal/Modal.jsx';
import Tooltip from '../components/Tooltip/Tooltip.jsx';

import QueueCanvas from '../components/QueueComponents/QueueCanvas.jsx';

import useSound from '../hooks/useSound.js';
import carArrival from "../assets/sounds/car-arrival.mp3";
import carRev1 from "../assets/sounds/car-rev-1.mp3";
import carRev2 from "../assets/sounds/car-rev-2.mp3";
import truckRun from "../assets/sounds/truck-run-1.mp3";

import pingSound from "../assets/sounds/ping.wav";
import resetSound from "../assets/sounds/thud.wav";
import errorSound from "../assets/sounds/damage.mp3";
import successSound from "../assets/sounds/complete.wav";

import History from '../components/History/History.jsx';


const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [poppedItem, setPoppedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [mode, setMode] = useState(''); // 'arrival' or 'departure'
  const [tempContainer, setTempContainer] = useState([]);
  const [pastCars, setPastCars] = useState([]); // Changed to an array to hold multiple past cars

  const [isTooltipClosed, setisTooltipClosed] = useState(true);

  const [showOverlay, setShowOverlay] = useState(false);
  const { playSound } = useSound();

  const [history, setHistorty] = useState([]);
  const [isOpenHistory, setIsOpenHistory] = useState(false);

  // Add a car to the queue
  const addQueue = (plateNumber) => {
    // Check if the queue is full
    if (queue.length >= 10) {
      playSound(errorSound);
      alert('Garage is full!');
      return;
    }

    // Check if the plate number exists in the queue
    if (queue.some(car => car.plateNumber === plateNumber)) {
      playSound(errorSound);
      alert('Car already exists!');
      return;
    }

    // Check if the car has arrived before
    const pastCarIndex = pastCars.findIndex(car => car.plateNumber === plateNumber);
    if (pastCarIndex !== -1) {
      const pastCar = pastCars[pastCarIndex];
      pastCar.arrivalCount += 1;
      setQueue([...queue, pastCar]);
      setPlateNumber('');
      setIsModalOpen(false);
      playSound(successSound);
      playSound(carArrival);
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
      order: queue.length + 1,
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

    // Add the new car to the queue
    setQueue([...queue, newCar]);
    // Add the new car to the history
    setHistorty([...history, newCar]);
    // Reset the plate number and close the modal
    setPlateNumber('');
    setIsModalOpen(false);
  };

  // Remove a car from the stack
  const removeQueue = (plateNumber) => {
    // Check if the stack is empty
    if (queue.length === 0) {
      playSound(errorSound);
      alert('Garage is empty!');
      return;
    }

    // Check if the plate number exists in the stack
    if (plateNumber === '') {
      playSound(errorSound);
      alert('Please enter a plate number!');
      return;
    }

    // Check if the plate number exists in the stack
    if (!queue.some(car => car.plateNumber === plateNumber)) {
      playSound(errorSound);
      alert('Car not found!');
      return;
    }

    let carFound = false;
    let removedCar = null;

    // Loop through the stack to find the car to remove
    while (queue.length > 0) {
      const currentCar = queue.shift();
      // Check if the current car is the car to remove
      if (currentCar.plateNumber === plateNumber && !carFound) {
        // Found the car to remove
        currentCar.departureCount += 1;
        removedCar = currentCar;
        carFound = true;
        const randomRevSound = Math.random() >= 0.5 ? carRev1 : carRev2;
        playSound(randomRevSound);
        playSound(successSound);
        setPoppedItem(removedCar);
        setShowOverlay(true);
        console.log(removedCar.plateNumber, "has been removed");
        break;
      } else {
        // Increment the departureCount of the current car
        currentCar.departureCount += 1;
        tempContainer.push(currentCar);
      }
    }

    // Update the arrival count for cars in the temporary container
    tempContainer.forEach(car => {
      car.arrivalCount += 1;
    });

    // Re-add the cars from temp back to the queue (back) and update the car orders
    setQueue([...queue, ...tempContainer].map((car, index) => {
      car.order = index + 1;
      return car;
    }));

    // Update the stack and temp container
    setTempContainer([]);
    setPlateNumber('');
    setIsModalOpen(false);

    // Adding the removed car to the past car state
    setPastCars(prevPastCars => [...prevPastCars, removedCar]);
    console.log(pastCars);
  };

  // Clear the stack
  const clearQueue = () => {
    playSound(resetSound);
    setPoppedItem(null);
    setQueue([]);
    setTempContainer([]);
    setPastCars([]);
    setShowOverlay(false);
    setHistorty([]);
    setIsOpenHistory(false);
  };

  // Color classes for the cars
  const colorClasses = ['Black', 'Blue', 'Brown', 'Green', 'Magenta', 'Red', 'White', 'Yellow'];

  // Car type classes
  const typeClasses = ['Ambulance', 'Taxi', 'Police', 'Bus', 'BoxTruck', 'Camper', 'Civic', 'Hatchback', 'Jeep', 'Limo', 'Luxury', 'MediumTruck', 'Micro', 'Minivan', 'Musclecar', 'Pickup', 'Sedan', 'Sport', 'Supercar', 'SUV', 'Van', 'Wagon']

  // Generate a random color class
  const colorGenerator = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)];
  };

  // Function for getting image paths
  const getImagePath = (type, color, isUtility) => {
    if (isUtility) {
      return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
    } else {
      return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
    }
  };

  // Handle the arrival button click
  const handleArrivalClick = () => {
    playSound(pingSound);
    if (queue.length >= 10) {
      alert('Garage is full! Cannot add more cars');
      return;
    }

    setMode('arrival');
    setIsModalOpen(true);
  };

  // Handle the departure button click
  const handleDepartureClick = () => {
    playSound(pingSound);
    if (queue.length === 0) {
      alert('Garage is empty! Cannot remove any cars');
      return;
    }

    setMode('departure');
    setIsModalOpen(true);
  };

  // Handle the modal form submission
  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (mode === 'arrival') {
      addQueue(plateNumber);
    } else if (mode === 'departure') {
      removeQueue(plateNumber);
    }
    setPlateNumber(''); // Clear the input field
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setPlateNumber(''); // Clear the input field
  };

  return (
    <div className="w-full h-full relative">

      {isOpenHistory && <History history={history} />}
      
      <div className='flex gap-2 justify-center top-2 left-0 absolute w-full z-10'>

        <button onClick={() => setIsOpenHistory(!isOpenHistory)} className="nes-btn flex justify-center items-center absolute top-0 left-3 is-warning rounded z-50 h-10 w-[56px]">
          <FontAwesomeIcon icon={faClockRotateLeft} className='h-full' />
        </button>

        {queue &&
        <button
          onClick={() => setisTooltipClosed(!isTooltipClosed)}
          className="nes-btn flex justify-center items-center absolute top-0 right-3 h-10 w-[56px] bg-gray-500 text-black rounded hover:bg-gray-600 hover:text-white active:opacity-80 z-40">
          {isTooltipClosed ? <FontAwesomeIcon icon={faTableList} className='h-full ' /> : <FontAwesomeIcon icon={faSquareMinus} className='h-full w-full' />}
        </button>
      }

        <button onClick={handleArrivalClick} className="nes-btn flex justify-center items-center is-primary rounded z-50 h-10 w-32 ">
          Arrival
        </button>

        <button onClick={handleDepartureClick} className="nes-btn flex justify-center items-center is-error rounded z-50 h-10 w-40">
          Departure
        </button>

        <button onClick={() => clearQueue()} className="nes-btn flex justify-center items-center z-50 h-10 w-28">
          Clear
        </button>
      </div>



      <div className={`fixed w-fit min-w-32 top-1/2 left-0 h-full`}>
        <div className='grid grid-cols-10 flex-grow relative'>
          {queue.map((car, index) => (
            <div key={index} className='flex flex-col items-center justify-center'>
              <Tooltip key={index}
                text={`${car.color} ${car.type} Order: ${car.order}`}
                alwaysVisible={!isTooltipClosed}
                optionalText={`Arrivals: ${car.arrivalCount} Departures: ${car.departureCount}`}
                position='bottom'
                addedStyle={`w-[125px]`}
              >
                <div className='p-2 flex items-end justify-center text-center align-text-bottom pb-5 h-[125px] w-[125px]'>
                  {car.plateNumber}
                </div>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      <QueueCanvas queue={queue} />

      {showOverlay && <StackOverlay car={poppedItem} setShowOverlay={setShowOverlay} />}

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        plateNumber={plateNumber}
        setPlateNumber={setPlateNumber}
        mode={mode}
        cars={queue}
      />
    </div>
  );
};

export default Queue;