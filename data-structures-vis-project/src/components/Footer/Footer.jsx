import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import {
  faGamepad,
  faCode,
  faUsers,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "../Tooltip/Tooltip";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t-4 border-white pixelated p-6">
      <div className="container mx-auto">
        {/* Top section with pixel decoration */}
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-white"></div>
            ))}
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="mb-3 text-yellow-300 text-lg nes-text">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-cyan-400 flex items-center"
                >
                  <FontAwesomeIcon icon={faGamepad} className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-cyan-400 flex items-center"
                >
                  <FontAwesomeIcon icon={faUsers} className="mr-2" /> About
                </Link>
              </li>
            </ul>
          </div>

          {/* Data Structures */}
          <div className="flex flex-col items-center">
            <h3 className="mb-3 text-yellow-300 text-lg nes-text">
              Data Structures
            </h3>
            <ul className="flex flex-col gap-2 items-center ">
              <li>
                <Link to="/stacks" className="text-white hover:text-cyan-400">
                  Stacks
                </Link>
              </li>
              <li>
                <Link to="/queue" className="text-white hover:text-cyan-400">
                  Queue
                </Link>
              </li>
              <li>
                <Link
                  to="/binary-tree-traversal"
                  className="text-white hover:text-cyan-400"
                >
                  Binary Tree
                </Link>
              </li>
              <li>
                <Link
                  to="/binary-search-tree"
                  className="text-white hover:text-cyan-400"
                >
                  BST
                </Link>
              </li>
              <li>
                <Link
                  to="/towers-of-hanoi"
                  className="text-white hover:text-cyan-400"
                >
                  Towers of Hanoi
                </Link>
              </li>
              <li>
                <Link to="/sorting" className="text-white hover:text-cyan-400">
                  Sorting
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="mb-3 text-yellow-300 text-lg nes-text">Connect</h3>
            <div className="flex flex-col ">
              <div className="flex flex-col">
                <Tooltip text="Gero B Anonuevo" position="left">
                <a
                  href="https://github.com/Gero-B-Anonuevo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 text-2xl"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                </Tooltip>
                <Tooltip text="Gerald Berongoy" position="left">
                <a
                  href="https://github.com/Gero-B-Anonuevo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 text-2xl"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                </Tooltip>
                <Tooltip text="Edward Borboran" position="left">
                <a
                  href="https://github.com/Gero-B-Anonuevo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 text-2xl"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                </Tooltip>
                <Tooltip text="Joshua Mistal" position="left">
                <a
                  href="https://github.com/Gero-B-Anonuevo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 text-2xl"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                </Tooltip>
              </div>

              <Tooltip text="Visit our GitHub repository" position="left">
              <a
                href="https://github.com/JoshuaHM-p4/data-structures-vis-project"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 text-2xl text-end"
              >
                <FontAwesomeIcon icon={faCode} />
              </a>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Bottom copyright section with pixel art */}
        <div className="mt-6 border-t border-gray-700 text-center">
          <div className="flex justify-center p-3">
            <img
              src="/navbar-img/rscsLogoBorder.png"
              alt="RS:CS Logo"
              style={{ width: "64px", height: "64px" }}
            />
          </div>

          <div className="mb-4 flex justify-center">
            <div className="flex space-x-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-white"></div>
              ))}
            </div>
          </div>

          {/* Pixel art "DSA" */}
          <div className="flex justify-center mb-3">
            <div className="grid grid-cols-3 gap-1">
              {/* "D" */}
              <div className="grid grid-cols-3 grid-rows-5 gap-0.5">
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
              </div>

              {/* "S" */}
              <div className="grid grid-cols-3 grid-rows-5 gap-0.5 mx-2">
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-transparent"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
              </div>

              {/* "A" */}
              <div className="grid grid-cols-3 grid-rows-5 gap-0.5">
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>

                <div className="w-2 h-2 bg-cyan-400"></div>
                <div className="w-2 h-2 bg-transparent"></div>
                <div className="w-2 h-2 bg-cyan-400"></div>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm">
            © 2025 Data Structures Visualization
          </p>
          <p className="text-gray-500 text-xs mt-2">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
