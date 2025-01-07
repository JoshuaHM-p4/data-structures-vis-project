import React, { useState, useRef } from 'react';
import MarioTube from '../components/MarioComponent/MarioTubes.jsx';
import Modal from '../components/StackQueueModal/Modal.jsx';
import { bubbleSort } from '../sortingAlgorithms/bubbleSort';
import { selectionSort } from '../sortingAlgorithms/selectionSort';
import { insertionSort } from '../sortingAlgorithms/insertionSort';
import { mergeSort } from '../sortingAlgorithms/mergeSort';
import { shellSort } from '../sortingAlgorithms/shellSort';
import { quickSort } from '../sortingAlgorithms/quickSort';
import { heapSort } from '../sortingAlgorithms/heapSort';

const Sorting = () => {
  const [arr, setArr] = useState([46, 21, 3, 12, 45, 2, 1, 5, 16, 10]);
  const [prevArr, setPrevArr] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);

  const [redTube, setRedTube] = useState([]);
  const [greenTube, setGreenTube] = useState([]);
  const [yellowTube, setYellowTube] = useState([]);

  const [isSorting, setIsSorting] = useState(false);
  const [sortMethod, setSortMethod] = useState('');

  const [swapping, setSwapping] = useState([-1, -1]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [delay, setDelay] = useState(100);
  const delayRef = useRef(delay);

  const getTubeMode = (index) => {
    if (redTube.includes(index)) return 'red';
    if (greenTube.includes(index)) return 'green';
    if (yellowTube.includes(index)) return 'yellow';
    return ''; // Default mode if no conditions match
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (message) => {
    setAlertMessage(message);
    setIsModalOpen(true);
  };

  const increaseDelay = () => {
    setDelay((prevDelay) => {
      const newDelay = prevDelay + 100;
      delayRef.current = newDelay;
      return newDelay;
    });
  };

  const decreaseDelay = () => {
    setDelay((prevDelay) => {
      const newDelay = prevDelay - 100;
      delayRef.current = newDelay;
      return newDelay;
    });
  };

  const handleSort = (sortType) => {
    setIsSorting(true);
    const startTime = performance.now();
    const sortCompleted = (sortName) => {
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
      handleModalOpen(`${sortName} Completed in ${timeTaken} seconds`);
      setIsSorting(false);
    };

    if (sortType === 'bubble') {
      bubbleSort(arr, setArr, setRedTube, setSwapping, setGreenTube, delayRef).then(() => sortCompleted('Bubble Sort'));
    } else if (sortType === 'selection') {
      selectionSort(arr, setArr, setRedTube, setYellowTube, setSwapping, setGreenTube, delayRef).then(() => sortCompleted('Selection Sort'));
    } else if (sortType === 'insertion') {
      insertionSort(arr, setArr, setRedTube, setYellowTube, setGreenTube, delayRef).then(() => sortCompleted('Insertion Sort'));
    } else if (sortType === 'merge') {
      mergeSort(arr, setArr, setRedTube, setGreenTube, delayRef).then(() => sortCompleted('Merge Sort'));
    }
    // } else if (sortType === 'shell') {
    //   shellSort(arr, setArr, setRedTube, setReferenceIndex, setSortedIndices, delayRef).then(() => sortCompleted('Shell Sort'));
    // } else if (sortType === 'quick') {
    //   quickSort(arr, setArr, setComparing, setReferenceIndex, setSortedIndices, delayRef).then(() => sortCompleted('Quick Sort'));
    // } else if (sortType === 'heap') {
    //   heapSort(arr, setArr, setComparing, setReferenceIndex, setSortedIndices, delayRef).then(() => sortCompleted('Heap Sort'));
    // }
  };

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 1);
    setArr(randomArray);
    setPrevArr([]);
    setRedTube([]);
    setGreenTube([]);
    setYellowTube([]);
    setSwapping([]);
    setIsDisabled(false);
  };

  return (
    <div className='flex h-full bg-green-100 flex-col items-center gap-3'>
      {/* Array Section */}
      <div className='flex gap-2 pt-2'>
        <button
          onClick={generateRandomArray}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Generate Random Array
        </button>
        <button
          onClick={decreaseDelay}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Decrease Delay
        </button>
        <button
          onClick={increaseDelay}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Increase Delay
        </button>
      </div>

      {/* Display Array */}
      <div className='flex gap-2 justify-center items-center w-full'>
        <p>Array:</p>
        {arr.map((num, index) => (
          <div key={index} className='p-2 bg-blue-500 text-white rounded'>
            {num}
          </div>
        ))}
        <p>Delay: {delay}</p>
      </div>

      {/* Button Section */}
      <div className='flex gap-2 justify-center items-center w-full bg-red-50'>
        <select
          className='p-2 h-full bg-blue-500 text-white rounded'
          disabled={isSorting}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="" disabled selected>Select Sort Method</option>
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="shell">Shell Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </select>
        <button
          className='p-2 h-full bg-blue-500 text-white rounded'
          disabled={isSorting}
          onClick={() => handleSort(sortMethod)}
        >
          Sort
        </button>
        <button
          className='p-2 h-full bg-blue-500 text-white rounded'
          onClick={() => {
            setArr([...prevArr]);
            setPrevArr([]);
            setRedTube([]);
            setGreenTube([]);
            setYellowTube([]);
            setSwapping([]);
            setIsDisabled(true);
          }}
          disabled={isDisabled}
        >
          Revert Array
        </button>
      </div>

      {/* Sorting Section */}
      <div className="flex flex-grow items-end gap-2 bg-red-50 h-full w-full justify-center">
        {arr.map((num, index) => (
          <div key={index} className={`flex flex-col items-center ${swapping.includes(index) ? 'swapping' : ''}`}>
            <MarioTube
              index={index}
              num = {num}
              height={num * 3} 
              mode={getTubeMode(index)}
            />
            <p>{num}</p>
          </div>
        ))}
      </div>
      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        alertMessage={alertMessage}
        mode="alert"
      />
    </div>
  );
};

export default Sorting;