import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);

  const navLinks = [
    { link: '/', title: 'Home' },
    { link: '/tic-tac-toe', title: 'Tic Tac Toe' },
    { link: '/stacks', title: 'Stacks' },
    { link: '/queue', title: 'Queue' },
    { link: '/binary-tree-traversal', title: 'Binary Tree Traversal' },
    { link: '/binary-search-tree', title: 'Binary Search Tree' },
    { link: '/towers-of-hanoi', title: 'Towers of Hanoi' },
    { link: '/sorting', title: 'Sorting' },
  ];

  return (
    <nav className="fixed w-full bg-stone-900 z-50 top-0 p-5 text-white shadow-md">
      <div className="flex items-center justify-between px-8">

        {/* Logo */}
        <h1 className="text-neutral-100">MyApp.dev</h1>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <FontAwesomeIcon icon={faBurger} size="xl" />
          </button>
        </div>

        {/* Menu Links */}
        <ul className={`${isMenuOpen ? 'flex flex-col' : 'hidden'} fixed lg:static top-16 left-0 right w-full lg:flex lg:flex-row lg:w-auto gap-2 bg-stone-900 lg:bg-transparent px-5 py-5 rounded-br-xl rounded-bl-xl lg:p-0 transition-all duration-300 ease-in-out`}>
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <Link
                className={`${isActive === navLink.link ? 'text-cyan-400 ' : ''} text-neutral-100 flex text-center align-middle justify-center lg:inline min-w-fit lg:m-0 bg-stone-800 lg:bg-transparent rounded-lg p-2 transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80`}                
                to={navLink.link}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsActive(navLink.link);
                }}
              >
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