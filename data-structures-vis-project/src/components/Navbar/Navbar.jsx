import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faAngleDown, faAngleUp, faHome, faInfoCircle, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import DropdownMenu from './DropdownMenu.jsx';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);
  const [currentGame, setCurrentGame] = useState('');
  const dropdownRef = useRef();
  const gamesRef = useRef();

  const navLinks = [
    { link: '/', title: 'Home' },
    { link: '/about', title: 'About' },
  ];

  const gameLinks = [
    { link: '/tic-tac-toe', title: 'Tic-Tac-Toe' },
    { link: '/stacks', title: 'Stacks' },
    { link: '/queue', title: 'Queue' },
    { link: '/binary-tree-traversal', title: 'Binary Tree Traversal' },
    { link: '/binary-search-tree', title: 'Binary Search Tree' },
    { link: '/towers-of-hanoi', title: 'Towers of Hanoi' },
    { link: '/sorting', title: 'Sorting' },
  ];

  useEffect(() => {
    setIsActive(location.pathname);
    const currentGameLink = gameLinks.find(game => game.link === location.pathname);
    if (currentGameLink) {
      setCurrentGame(currentGameLink.title);
    } else {
      setCurrentGame('');
    }
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        gamesRef.current &&
        !gamesRef.current.contains(event.target) // Ensure gamesRef is not clicked
      ) {
        setIsDropdownOpen(false); // Close dropdown
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, gamesRef]); // Correct dependencies
  

  return (
    <nav className="fixed w-full h-[64px] bg-stone-900 z-50 top-0 p-5 text-white shadow-md border-b">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => {
            setIsDropdownOpen(false);
            setCurrentGame('');
            setIsActive('/');
          }}
        >
          <h1 className="text-neutral-50 hover:text-cyan-400">MyApp.dev</h1>
        </Link>

        {/* Smaller Screens */}
        <div className="sm:hidden flex gap-7 items-center">
          {/* Home Icon */}
          <Link 
            to="/" 
            className={`sm:hidden ${isActive === '/' ? 'text-cyan-400' : 'text-neutral-100'} hover:text-cyan-400`}
            onClick={() => {
              setIsDropdownOpen(false);
              setCurrentGame('');
              setIsActive('/');
            }}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>

          {/* About Icon */}
          <Link 
            to="/about" 
            className={`sm:hidden ${isActive === '/about' ? 'text-cyan-400' : 'text-neutral-100'} hover:text-cyan-400`}
            onClick={() => {
              setIsDropdownOpen(false);
              setCurrentGame('');
              setIsActive('/about');
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} size="lg" />
          </Link>

          {/* Hamburger Icon */}
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="sm:hidden focus:outline-none nes-pointer text-neutral-100 hover:text-cyan-400">
            <FontAwesomeIcon icon={faGamepad} size="xl" />
          </button>

          <DropdownMenu
            isDropdownOpen={isDropdownOpen}
            gameLinks={gameLinks}
            isActive={isActive}
            setIsDropdownOpen={setIsDropdownOpen}
            setCurrentGame={setCurrentGame}
            setIsActive={setIsActive}
            dropdownRef={dropdownRef}
          />
        </div>

        {/* Menu Links */}
        <ul className="hidden sm:static top-16 left-0 right w-full sm:flex sm:flex-row sm:w-auto gap-2 bg-stone-900 sm:bg-transparent p-5 rounded-br-xl rounded-bl-xl sm:p-0 transition-all duration-300 ease-in-out">
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <Link
                className={` ${isActive === navLink.link ? 'text-cyan-400' : 'text-neutral-100'} flex p-2 text-center align-middle justify-center sm:inline min-w-fit sm:m-0 bg-stone-800 sm:bg-transparent rounded-lg transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80`}
                to={navLink.link}
                onClick={() => {
                  setIsDropdownOpen(false);
                  setCurrentGame('');
                  setIsActive(navLink.link);
                }}
              >
                {navLink.title}
              </Link>
            </li>
          ))}
          <li className="relative">
            <span
              ref={gamesRef}
              className={`flex items-center p-2 text-center align-middle justify-center sm:inline min-w-fit sm:m-0 bg-stone-800 sm:bg-transparent rounded-lg transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80 nes-pointer ${currentGame ? 'text-cyan-400' : 'text-neutral-100'}`}
              onClick={() => {
                event.stopPropagation();
                setIsDropdownOpen((prev) => !prev);
              }}
            >
              {currentGame ? currentGame : 'Games'}
              {isDropdownOpen ? (
                <FontAwesomeIcon icon={faAngleUp} className="ml-1" />
              ) : (
                <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
              )}
            </span>

            <DropdownMenu
              isDropdownOpen={isDropdownOpen}
              gameLinks={gameLinks}
              isActive={isActive}
              setIsDropdownOpen={setIsDropdownOpen}
              setCurrentGame={setCurrentGame}
              setIsActive={setIsActive}
              dropdownRef={dropdownRef}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;