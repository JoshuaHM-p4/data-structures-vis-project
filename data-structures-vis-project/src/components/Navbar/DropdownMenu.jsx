import { Link } from 'react-router-dom';

const DropdownMenu = ({ isDropdownOpen, gameLinks, isActive, setIsDropdownOpen, setCurrentGame, setIsActive, dropdownRef }) => {
  return (
    <ul className={` ${isDropdownOpen ? 'flex flex-col' : 'hidden'} fixed sm:absolute top-16 sm:top-11 left-0 sm:left-auto right sm:-right-5 w-full sm:w-56 gap-2 bg-stone-900 pt-5 rounded-br-xl rounded-bl-xl transition-all duration-300 ease-in-out`}
      ref={dropdownRef}
    >
      {gameLinks.map((gameLink, index) => (
        <li key={index}>
          <Link
            className={` ${isActive === gameLink.link ? 'text-cyan-400' : 'text-neutral-100'} block px-4 py-2 mx-5 text-center align-middle justify-center bg-stone-800 rounded-lg transition-all duration-300 ease-in-out hover:text-cyan-400 hover:bg-stone-700 active:opacity-80`}
            to={gameLink.link}
            onClick={() => {
              setIsDropdownOpen(false);
              setCurrentGame(gameLink.title);
              setIsActive(gameLink.link);
            }}
          >
            {gameLink.title}
          </Link>
        </li>
      ))}
      {/* Mario Running */}
        <div className="flex justify-center h-10 relative overflow-hidden bg-transparent">
          <img 
          src="https://i.pinimg.com/originals/98/63/79/9863792971304624d70102fb7058be44.png" 
          className="h-full absolute top-1 walk-animation" 
          />
        </div>
    </ul>
  );
};

export default DropdownMenu;