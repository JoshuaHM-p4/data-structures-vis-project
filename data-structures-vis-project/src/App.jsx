import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

import BinarySearchTreePage from './Pages/BinarySearchTreePage.jsx';
import BinaryTreeTraversalPage from './Pages/BinaryTreeTraversalPage.jsx';
import Queue from './Pages/Queue.jsx';
import Stacks from './Pages/Stacks.jsx';
import TicTacToe from './Pages/TicTacToe.jsx';
import TowerOfHanoi from './Pages/TowerOfHanoi.jsx';
import Sorting from './Pages/Sorting.jsx';
import Play from './Pages/Play.jsx';

import './App.css';

const App = () => {
  const location = useLocation();

  const routeTitles = {
    '/': 'RS:CS - Home',
    '/stacks': 'RS:CS - Stacks',
    '/queue': 'RS:CS - Queue',
    '/binary-tree-traversal': 'RS:CS - Binary Tree Traversal',
    '/binary-search-tree': 'RS:CS - Binary Search Tree',
    '/tic-tac-toe': 'RS:CS - Tic Tac Toe',
    '/towers-of-hanoi': 'RS:CS - Towers of Hanoi',
    '/sorting': 'RS:CS - Sorting',
    '/play': 'RS:CS - Play',
  };

  useEffect(() => {
    const title = routeTitles[location.pathname];
    document.title = title;
  }, [location]);

  return (
    <div className="h-full w-full pt-[64px] text-[11px] 2xl:text-[14px] text-border">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stacks" element={<Stacks />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/binary-tree-traversal" element={<BinaryTreeTraversalPage />} />
        <Route path="/binary-search-tree" element={<BinarySearchTreePage />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/towers-of-hanoi" element={<TowerOfHanoi />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </div>
  );
};

export default App;