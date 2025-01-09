import React, { useState, useRef, useEffect } from 'react';
import MarioTube from '../components/MarioComponent/MarioTubes.jsx';
import Modal from '../components/StackQueueModal/Modal.jsx';
import Slider from '../components/Slider/Slider.jsx';

import { faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { bubbleSort } from '../sortingAlgorithms/bubbleSort';
import { selectionSort } from '../sortingAlgorithms/selectionSort';
import { insertionSort } from '../sortingAlgorithms/insertionSort';
import { mergeSort } from '../sortingAlgorithms/mergeSort';
import { shellSort } from '../sortingAlgorithms/shellSort';
import { quickSort } from '../sortingAlgorithms/quickSort';
import { heapSort } from '../sortingAlgorithms/heapSort';

const Sorting = () => {
  const [arr, setArr] = useState([46, 21, 3, 12, 45, 2, 1, 5, 16, 10, 17, 28, 19, 13, 13, 11, 35, 17, 1, 19]);
  const [prevArr, setPrevArr] = useState([]);

  const [isFinished, setIsFinished] = useState(false);

  const [redTube, setRedTube] = useState([]);
  const [greenTube, setGreenTube] = useState([]);
  const [yellowTube, setYellowTube] = useState([]);
  const [orangeTube, setOrangeTube] = useState([]);

  const [isSorting, setIsSorting] = useState(false);
  const [sortMethod, setSortMethod] = useState('');

  const [swapping, setSwapping] = useState([-1, -1]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [delay, setDelay] = useState(100);
  const delayRef = useRef(delay);

  const [arraySize, setArraySize] = useState(20);

  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const getTubeMode = (index) => {
    if (redTube.includes(index)) return 'red';
    if (greenTube.includes(index)) return 'green';
    if (yellowTube.includes(index)) return 'yellow';
    if (orangeTube.includes(index)) return 'orange';
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
    if (prevDelay >= 500) return prevDelay
      const newDelay = prevDelay + 50;
      delayRef.current = newDelay;
      return newDelay;
    });
  };

  const decreaseDelay = () => {
    setDelay((prevDelay) => {
    if (prevDelay <= 0) return prevDelay
      const newDelay = prevDelay - 50;
      delayRef.current = newDelay;
      return newDelay;
    });
  };

  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 10);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const handleSort = (sortType) => {
    if (!sortType){
      return;
    }
    setIsSorting(true);
    setTimer(0);
    startTimer();
    const sortCompleted = (sortName) => {
      stopTimer();
      handleModalOpen(`${sortName} Completed`); 
      setIsSorting(false);
      setIsFinished(true);
      setPrevArr([...arr]);
    };
    

    if (sortType === 'bubble') {
      bubbleSort(arr, setArr, setRedTube, setSwapping, setGreenTube, delayRef, setPrevArr).then(() => sortCompleted('Bubble Sort'));
    } else if (sortType === 'selection') {
      selectionSort(arr, setArr, setRedTube, setYellowTube, setSwapping, setGreenTube, delayRef).then(() => sortCompleted('Selection Sort'));
    } else if (sortType === 'insertion') {
      insertionSort(arr, setArr, setRedTube, setYellowTube, setGreenTube, delayRef).then(() => sortCompleted('Insertion Sort'));
    } else if (sortType === 'merge') {
      mergeSort(arr, setArr, setRedTube, setGreenTube, delayRef).then(() => sortCompleted('Merge Sort'));
    }
    // } else if (sortType === 'shell') {
    //   shellSort(arr, setArr, setRedTube, setReferenceIndex, setSortedIndices, delayRef).then(() => sortCompleted('Shell Sort'));
    else if (sortType === 'quick') {
      quickSort(arr, setArr, setRedTube, setYellowTube, setGreenTube, setOrangeTube, delayRef).then(() => sortCompleted('Quick Sort'));
    } 
    // else if (sortType === 'heap') {
    //   heapSort(arr, setArr, setComparing, setReferenceIndex, setSortedIndices, delayRef).then(() => sortCompleted('Heap Sort'));
    // }
  };

  const generateRandomArray = (size) => {
    const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    setArr(randomArray);
    setPrevArr([]);
    setRedTube([]);
    setGreenTube([]);
    setYellowTube([]);
    setSwapping([]);
    setIsFinished(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formattedTimer = (timer / 1000).toFixed(2);

  return (
    <div className='flex h-full flex-col items-center gap-2 p-2'>
      {/* Upper Section */}
      <div className='flex flex-row justify-between items-center w-full gap-2'>
        {/* Left Section */}
        <div className='flex flex-col gap-2 p-2 w-full h-full justify-center items-start'>
          <div className='flex gap-2 justify-start items-center'>
            <p className='pr-2'>Array Size: </p>
            <Slider 
              min={10}
              max={30}
              value={arraySize}
              onChange={(value) => {
                setArraySize(value);
                generateRandomArray(value);
                setIsFinished(false);
              }}
              isDisabled={isSorting}
            />
          </div>
        
          <button
            onClick={() => generateRandomArray(arraySize)}
            className={`nes-btn ${isSorting ? 'is-disabled' : 'is-warning'}`}
            disabled={isSorting}
          >
            Generate Random Array
          </button>
        </div>

        {/* Middle Section */}
        <div className='flex flex-col justify-center w-full items-center'>
        <div className="nes-select flex flex-col justify-center items-center px-1">
          <select
              className='default_select text-black'
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
          </div>
        {/*Buttons*/}
        <div className='flex w-full justify-center items-center'>
          <button
            className= {`nes-btn w-full ${isSorting || isFinished || !sortMethod ? 'is-disabled' : 'is-primary'}`}
            onClick={() => handleSort(sortMethod)}
            disabled={ isSorting || isFinished || !sortMethod} 
          >
            Sort
          </button>
          <button
            className= {`nes-btn w-full ${ !isFinished || isSorting ? 'is-disabled' : 'is-error'}`}
            onClick={() => {
              setArr(prevArr);
              setRedTube([]);
              setGreenTube([]);
              setYellowTube([]);
              setSwapping([]);
              setIsFinished(false);
            }}
            disabled={ !isFinished || isSorting}
          >
            Unsort 
          </button>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex flex-col gap-2 justify-center items-end w-full h-full'>
          <div className='relative'>
          <p className='mr-5'>Delay: {delay}ms</p>
          <button
            className='absolute right-1 -top-1.5 focus:outline-none'
            
          >
            <FontAwesomeIcon icon={faCaretUp} size="2xl" 
            className='hover:text-red-500 active:scale-110' 
            onClick={increaseDelay}/>
          </button>
          <button
            className='absolute right-1 top-0.5 focus:outline-none'
          >
            <FontAwesomeIcon icon={faCaretDown} size="2xl"
            className='hover:text-red-500 active:scale-110' 
            onClick={decreaseDelay}/>
          </button>
          </div>
          <p className='p-2'>Timer: {formattedTimer} secs</p>
        </div>
      </div>

      {/* Sorting Section */}
      <div className="flex flex-grow items-end gap-2h-full w-full justify-center">
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