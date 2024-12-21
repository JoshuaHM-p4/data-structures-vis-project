import React from 'react';
import { Link } from 'react-router-dom';
import HomepageItem from '../components/HomepageComponents/HomepageItem.jsx';
import Tooltip from '../components/Tooltip/Tooltip.jsx';

const Home = () => {
  const navLinks = [
    { Link: '/tic-tac-toe', title: 'Tic Tac Toe', description: 'Array application with the use of column and row coordinates.' },
    { Link: '/stacks', title: 'Stacks', description: 'Simulation of a Stack using the 10-vehicle CEA garage as the model.' },
    { Link: '/queue', title: 'Queue', description: 'Simulation of a Queue using the 10-vehicle CEA garage as the model.' },
    { Link: '/binary-tree-traversal', title: 'Binary Tree', description: 'Binary Tree Navigator (LTR, TLR, LRT).' },
    { Link: '/binary-search-tree', title: 'BST', description: 'Binary Search Tree generator and navigator.' },
    { Link: '/towers-of-hanoi', title: 'Towers of Hanoi', description: 'Random Towers of Hanoi problem generator.' },
    { Link: '/sorting', title: 'Sorting', description: 'Integers Sorter (Bubble, Insertion, Selection, Merge, Shell, Quick, Heap).' },
    { Link: '/', title: 'About', description: 'Learn more about this project.' },
  ];

  return (
    <div className="bg-slate-700 md:h-full p-2 sm:p-4">
      <div className="h-full w-full flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Welcome to Data Structures Visualization
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {navLinks.map((navLink, index) => (
            <Tooltip key={index} text={navLink.description}>
              <HomepageItem item={navLink} />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;