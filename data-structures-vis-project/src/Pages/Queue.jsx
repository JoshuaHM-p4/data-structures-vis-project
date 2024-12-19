import React, { useState } from 'react';
import StackOverlay from '../components/StacksComponents/StackOverlay.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [poppedItem, setPoppedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [mode, setMode] = useState(''); // 'arrival' or 'departure'
  const [tempContainer, setTempContainer] = useState([]);
  const [pastCars, setPastCars] = useState([]); // Changed to an array to hold multiple past cars

  // Add a car to the queue
  const addQueue = (plateNumber) => {
    // Check if the queue is full
    if (queue.length >= 10) {
      alert('Garage is full!');
      return;
    }

    // Check if the plate number exists in the queue
    if (queue.some(car => car.plateNumber === plateNumber)) {
      alert('Car already exists!');
      return;
    }

    // Check if the car has arrived before
    const pastCarIndex = pastCars.findIndex(car => car.plateNumber === plateNumber);
    if (pastCarIndex !== -1) {
      const pastCar = pastCars[pastCarIndex];
      pastCar.arrivalCount += 1;
      setQueue([ ...queue, pastCar ]);
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

    // Add the new car to the queue
    setQueue([...queue, newCar]);
    // Reset the plate number and close the modal
    setPlateNumber('');
    setIsModalOpen(false);
  };

  // Remove a car from the stack
  const removeQueue = (plateNumber) => {
    // Check if the stack is empty
    if (queue.length === 0) {
      alert('Garage is empty!');
      return;
    }

    // Check if the plate number exists in the stack
    if (plateNumber === '') {
      alert('Please enter a plate number!');
      return;
    }

    // Check if the plate number exists in the stack
    if (!queue.some(car => car.plateNumber === plateNumber)) {
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
    setQueue([ ...tempContainer, ...queue ]);

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
    setPoppedItem(null);
    setQueue([]);
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
    if (queue.length >= 10) {
      alert('Garage is full! Cannot add more cars');
      return;
    }

    setMode('arrival');
    setIsModalOpen(true);
  };

  // Handle the departure button click
  const handleDepartureClick = () => {
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
    <div className="w-full h-full flex flex-col">      
      <div className='flex gap-2 justify-center py-3'>
        <button onClick={handleArrivalClick } className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:opacity-80">
          Arrival
        </button>

        <button onClick={handleDepartureClick} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 active:opacity-80">
          Departure
        </button>

        <button onClick={() => clearQueue()} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:opacity-80">
          Clear
        </button>
      </div>
      
      <div className='grid grid-cols-10 gap-5 mx-5 flex-grow'>
        {queue.map((car, index) => (
          <div key={index} className='flex flex-col p-5 my-auto items-center justify-center border rounded-lg'>
            <FontAwesomeIcon className={car.color} icon={faCarSide} flip="horizontal" size="2xl" />
            {car.plateNumber}
            <div className="text-sm">
              Arrivals: {car.arrivalCount} | Departures: {car.departureCount}
            </div>
          </div>
        ))}
      </div>

      {poppedItem && <StackOverlay car={poppedItem} />}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl mb-4 text-black">Enter Plate Number</h2>
            <form onSubmit={handleModalSubmit}>
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                placeholder="Plate Number"
                className="px-4 py-2 border rounded mb-4 w-full text-black"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 active:opacity-80"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:opacity-80">
                  {mode === 'arrival' ? 'Add Car' : 'Remove Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue;