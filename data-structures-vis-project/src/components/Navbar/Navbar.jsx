import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger, faAngleDown, faAngleUp, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);
  const [currentGame, setCurrentGame] = useState('');

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location]);

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

  return (
    <nav className="fixed w-full h-[64px] bg-stone-900 z-50 top-0 p-5 text-white shadow-md border-b">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" 
        onClick={() => {
          setIsMenuOpen(false)
          setIsDropdownOpen(false)
          setCurrentGame('')
        }}>
          <h1 className="text-neutral">MyApp.dev</h1>
        </Link>

        {/* Smaller Screens */}
        <div className="sm:hidden flex gap-5 items-center">  
        {/* Home Icon */}
        <Link to="/" className="sm:hidden">
          <FontAwesomeIcon icon={faHome} size="lg" />
        </Link>

        {/* About Icon */}
        <Link to="/about" className="sm:hidden">
          <FontAwesomeIcon icon={faInfoCircle} size="lg" />
        </Link>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <FontAwesomeIcon icon={faBurger} size="xl" />
          </button>
        </div>
        </div>
        {/* Menu Links */}
        <ul className= 'fixed sm:static top-16 left-0 right w-full sm:flex sm:flex-row sm:w-auto gap-2 bg-stone-900 sm:bg-transparent p-5 rounded-br-xl rounded-bl-xl sm:p-0 transition-all duration-300 ease-in-out' >
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <Link
                className={` ${isActive === navLink.link ? 'text-cyan-400' : "text-neutral-100"} flex p-2 text-center align-middle justify-center sm:inline min-w-fit sm:m-0 bg-stone-800 sm:bg-transparent rounded-lg transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80`}
                to={navLink.link}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsDropdownOpen(false);
                  setCurrentGame('');
                }}
              >
                {navLink.title}
              </Link>

              {/* Will appear if the dropdown is active and the breakpoint is small */}
                            
            </li>
          ))}
          <li>
            <span
              className={`flex items-center p-2 text-center align-middle justify-center sm:inline min-w-fit sm:m-0 bg-stone-800 sm:bg-transparent rounded-lg transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80 ${currentGame ? 'text-cyan-400' : 'text-neutral-100'}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {currentGame ? currentGame : 'Games'}
              {isDropdownOpen 
              ? (<FontAwesomeIcon icon={faAngleUp} className="ml-1" />) 
              : (<FontAwesomeIcon icon={faAngleDown} className="ml-1" />)}
            </span>
            
            <ul className={` ${isDropdownOpen ? 'flex flex-col' : 'hidden'} fixed top-16 left-0 right w-full gap-2 bg-stone-900  px-5 py-5 rounded-br-xl rounded-bl-xl transition-all duration-300 ease-in-out`}>
              {gameLinks.map((gameLink, index) => (
                <li key={index}>
                  <Link
                    className={` ${isActive === gameLink.link ? 'text-cyan-400' : "text-neutral-100"} block px-4 py-2 text-center align-middle justify-center bg-stone-800 rounded-lg transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80`}
                    to={gameLink.link}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                      setCurrentGame(gameLink.title);
                    }}
                  >
                    {gameLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;