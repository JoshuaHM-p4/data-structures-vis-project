import React from 'react';
import { Link } from 'react-router-dom';
import HomepageItem from '../components/HomepageComponents/HomepageItem.jsx';

const Home = () => {
  const navLinks = [
    {Link: '/tic-tac-toe', title: 'Tic Tac Toe'},
    {Link: '/stacks', title: 'Stacks'},
    {Link: '/queue', title: 'Queue'},
    {Link: '/binary-tree-traversal', title: 'Binary Tree'},
    {Link: '/binary-search-tree', title: 'BST'},
    {Link: '/towers-of-hanoi', title: 'Towers of Hanoi'},
    {Link: '/sorting', title: 'Sorting'},
    {Link: '/', title: 'About'},
  ]

  return (
    <div className="bg-slate-700 h-full w-full">
      <div className="h-full w-full flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Welcome to Data Structures Visualization</h1>
        <div className="grid grid-cols-4 gap-4">
          {navLinks.map((navLink, index) => (
            <HomepageItem key={index} item={navLink} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;