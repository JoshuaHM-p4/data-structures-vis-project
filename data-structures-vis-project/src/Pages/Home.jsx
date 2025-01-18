import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Carousel from '../components/Carousel/Carousel.jsx';
import useSound from '../hooks/useSound.js';
import select from '../assets/sounds/select.mp3';
import ping from '../assets/sounds/ping.wav';

import mainMenuSound from '/music/mainMenu.mp3';

const Home = () => {
  const [openCarousel, setOpenCarousel] = useState(false);

  const { playSound } = useSound();
  const selectSound = () => { playSound(select) };
  const pingSound = () => { playSound(ping) };

  const musicAudioRef = useRef(null);
    const playMusic = () => {
      musicAudioRef.current = playSound(mainMenuSound, { volume: 0.3, loop: true });
    };

  useEffect(() => {
    playMusic();
    return () => {
      musicAudioRef.current.pause();
    };
  }, []);

  const navLinks = [
    { Link: '/tic-tac-toe', title: 'Tic Tac Toe', description: 'Array application with the use of column and row coordinates.' },
    { Link: '/stacks', title: 'Stacks', description: 'Simulation of a Stack using the 10-vehicle CEA garage as the model.' },
    { Link: '/queue', title: 'Queue', description: 'Simulation of a Queue using the 10-vehicle CEA garage as the model.' },
    { Link: '/binary-tree-traversal', title: 'Binary Tree', description: 'Binary Tree Navigator (LTR, TLR, LRT).' },
    { Link: '/binary-search-tree', title: 'BST', description: 'Binary Search Tree generator and navigator.' },
    { Link: '/towers-of-hanoi', title: 'Towers of Hanoi', description: 'Random Towers of Hanoi problem generator.' },
    { Link: '/sorting', title: 'Sorting', description: 'Integers Sorter (Bubble, Insertion, Selection, Merge, Shell, Quick, Heap).' },
  ];

  return (
    <div className='bg-[url("/main-menu/mainBGv1.png")] bg-center bg-cover bg-no-repeat h-full p-2 sm:p-4 relative pixelated'>
      <div className="h-full w-full flex flex-col items-center justify-end text-center relative">
        {/* <button className="nes-btn is-primary absolute top-0 left-0" 
          onClick={() => {
            setOpenCarousel(prevState => !prevState);
            selectSound();
          }}>
          Draw Cards
        </button>         */}

        {openCarousel && <div className='fixed top-0 left-0 w-full h-full z-20 bg-black opacity-75'/>}
        {openCarousel && <FontAwesomeIcon icon={faX} size='2xl' className='z-20 absolute top-0 right-0 rounded-full p-3 text-white w-6 h-6 hover:bg-gray-500 hover:bg-opacity-60 transform ease-in-out active:scale-110 transition-all '
          onClick={() => {
            setOpenCarousel(false); 
            pingSound();}}
          />}
        {openCarousel && (
        <Carousel items={navLinks} />
        )}


      {/* <img src="/main-menu/backFaceCard.png" alt="backCard" 
        className='z-10 fixed top-32 left-12 h-44 nes-pointer hover:scale-105 transition-all duration-300 pixelated'
        onClick={() => {
          setOpenCarousel(true)
          selectSound()}}/> */}

    <button className="nes-btn focus:outline-none"
      onClick={() => {setOpenCarousel(true); selectSound();}}>Draw Cards</button>
      </div>
    </div>
  );
};

export default Home;