import React, { useState, useRef, useEffect } from 'react';
import Carousel from '../components/Carousel/Carousel.jsx';
import useSound from '../hooks/useSound.js';
import select from '../assets/sounds/select.mp3';

const Home = () => {
  const [openCarousel, setOpenCarousel] = useState(false);

  const { playSound } = useSound();
  const selectSound = () => { playSound(select) };

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
    <div className='bg-[url("/main-menu/mainBG.png")] bg-center bg-cover h-full p-2 sm:p-4'>
      <div className="h-full w-full flex flex-col items-center justify-center text-center gap-3 relative">
        <button className="nes-btn is-primary absolute top-0 left-0" 
          onClick={() => {
            setOpenCarousel(prevState => !prevState);
            selectSound();
          }}>
          Draw Cards
        </button>        

        {openCarousel && <div className='fixed top-0 left-0 w-full h-full z-10 bg-black opacity-75'/>}
        {openCarousel && (
        <Carousel items={navLinks} setOpenCarousel={setOpenCarousel} />

        )}
      </div>
    </div>
  );
};

export default Home;