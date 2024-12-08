import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    {Link: '/', title: 'Home'},
    {Link: '/tic-tac-toe', title: 'Tic Tac Toe'},
    {Link: '/stacks', title: 'Stacks'},
    {Link: '/queue', title: 'Queue'},
    {Link: '/binary-tree-traversal', title: 'Binary Tree Traversal'},
    {Link: '/binary-search-tree', title: 'Binary Search Tree'},
    {Link: '/towers-of-hanoi', title: 'Towers of Hanoi'},
    {Link: '/sorting', title: 'Sorting'},
  ]

  return (
    <nav className="absolute w-screen bg-stone-900 z-50 top-0 p-5 text-white shadow-md">
      <div className="flex items-center justify-between px-8">
        <h1 className="text-neutral-100">MyApp</h1>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {/* Simple Hamburger Icon */}
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        {/* Menu Links */}
        <ul
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute lg:static top-16 left-0 w-full lg:w-auto lg:flex gap-2 bg-stone-900 lg:bg-transparent p-5 lg:p-0`}
        >
          {navLinks.map((navLink, index) => (
            <li key={index} className="mr-6">
              <Link className="text-neutral-100 block md:inline" to={navLink.Link}>
                {navLink.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;