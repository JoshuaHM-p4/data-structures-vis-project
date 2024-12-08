import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
    <nav className=" sticky bg-stone-900 z-50 top-0 p-5 text-white shadow-md">
      <ul className="flex gap-2 px-[10rem] align-center justify-between" >
        {navLinks.map((navLink, index) => (
          <li key={index} className="mr-6">
            <Link className="text-neutral-100" to={navLink.Link}>{navLink.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;