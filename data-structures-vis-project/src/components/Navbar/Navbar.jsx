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
    { link: '/tic-tac-toe', title: 'Tic-Tac-Toe' },
    { link: '/stacks', title: 'Stacks' },
    { link: '/queue', title: 'Queue' },
    { link: '/binary-tree-traversal', title: 'Binary Tree Traversal' },
    { link: '/binary-search-tree', title: 'Binary Search Tree' },
    { link: '/towers-of-hanoi', title: 'Towers of Hanoi' },
    { link: '/sorting', title: 'Sorting' },
  ];

  return (
    <nav className="fixed w-full h-[64px] bg-stone-900 z-50 top-0 p-5 text-white shadow-md">
      <div className="flex items-center justify-between h-full">

        {/* Logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
        <h1 className="text-neutral">MyApp.dev</h1>
        </Link>
        {/* Hamburger Icon */}
        <div className="xl:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <FontAwesomeIcon icon={faBurger} size="xl" />
          </button>
        </div>

        {/* Menu Links */}
        <ul className={`${isMenuOpen ? 'flex flex-col' : 'hidden'} fixed xl:static top-16 left-0 right w-full xl:flex xl:flex-row xl:w-auto gap-2 bg-stone-900 xl:bg-transparent px-5 py-5 rounded-br-xl rounded-bl-xl xl:p-0 transition-all duration-300 ease-in-out`}>
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <Link
                className={` ${isActive === navLink.link ? 'text-cyan-400' : "text-neutral-100"} flex p-2 text-center align-middle justify-center xl:inline min-w-fit xl:m-0 bg-stone-800 xl:bg-transparent rounded-lg transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80`}                
                to={navLink.link}
                onClick={() => {
                  setIsMenuOpen(false);
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