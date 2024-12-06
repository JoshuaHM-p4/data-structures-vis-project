import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

import BinarySearchTreePage from './Pages/BinarySearchTreePage/BinarySearchTreePage.jsx';
import BinaryTreeTraversalPage from './Pages/BinaryTreeTraversalPage/BinaryTreeTraversalPage.jsx';
import Queue from './Pages/Queue/Queue.jsx';
import Stacks from './Pages/Stacks/Stacks.jsx';
import TicTacToe from './Pages/TicTacToe/TicTacToe.jsx';
import './App.css';

const App = () => {


  return (
    <div className="h-full w-full -mt-16">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stacks" element={<Stacks />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/binary-tree-traversal" element={<BinaryTreeTraversalPage />} />
        <Route path="/binary-search-tree" element={<BinarySearchTreePage />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
      </Routes>
    </div>
  );
};

export default App;
