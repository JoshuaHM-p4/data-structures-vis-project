import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer/Footer.jsx";

import {
  faX,
  faGamepad,
  faChevronDown,
  faPlay,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import Carousel from "../components/Carousel/Carousel.jsx";
import useSound from "../hooks/useSound.js";
import select from "../assets/sounds/select.mp3";
import ping from "../assets/sounds/ping.wav";

import mainMenuSound from "/music/mainMenu.mp3";

import { useNavigate } from "react-router-dom"; //

const Home = () => {
  const [openCarousel, setOpenCarousel] = useState(false);
  const aboutSectionRef = useRef(null);
  const navigate = useNavigate();

  const { playSound } = useSound();
  const selectSound = () => {
    playSound(select);
  };
  const pingSound = () => {
    playSound(ping);
  };

  const musicAudioRef = useRef(null);
  const playMusic = () => {
    musicAudioRef.current = playSound(mainMenuSound, {
      volume: 0.3,
      loop: true,
    });
  };

  useEffect(() => {
    playMusic();
    return () => {
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
      }
    };
  }, []);

  const scrollToGames = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    pingSound();
  };

  const gameItems = [
    {
      Link: "/tic-tac-toe",
      title: "Tic Tac Toe",
      description:
        "Array application with the use of column and row coordinates.",
      image: "/main-menu/tictactoeCard.png",
      ss: "/main-menu/screenshot/ttt.png",
    },
    {
      Link: "/stacks",
      title: "Stacks",
      description:
        "Simulation of a Stack using the 10-vehicle CEA garage as the model.",
      image: "/main-menu/stacksCard.png",
      ss: "/main-menu/screenshot/stack.png",
    },
    {
      Link: "/queue",
      title: "Queue",
      description:
        "Simulation of a Queue using the 10-vehicle CEA garage as the model.",
      image: "/main-menu/queueCard.png",
      ss: "/main-menu/screenshot/queue.png",
    },
    {
      Link: "/binary-tree-traversal",
      title: "Binary Tree",
      description: "Binary Tree Navigator (LTR, TLR, LRT).",
      image: "/main-menu/bttCard.png",
      ss: "/main-menu/screenshot/btt.png",
    },
    {
      Link: "/binary-search-tree",
      title: "BST",
      description: "Binary Search Tree generator and navigator.",
      image: "/main-menu/bstCard.png",
      ss: "/main-menu/screenshot/bst.png",
    },
    {
      Link: "/towers-of-hanoi",
      title: "Towers of Hanoi",
      description: "Random Towers of Hanoi problem generator.",
      image: "/main-menu/tohCard.png",
      ss: "/main-menu/screenshot/toh.png",
    },
    {
      Link: "/sorting",
      title: "Sorting",
      description:
        "Integers Sorter (Bubble, Insertion, Selection, Merge, Shell, Quick, Heap).",
      image: "/main-menu/sortingCard.png",
      ss: "/main-menu/screenshot/sorting.png",
    },
  ];

  return (
    <div className="h-full w-full overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-red [&::-webkit-scrollbar-thumb]:bg-[url('/background/smb3-map.png')]">
      {/* Hero Section */}
      <div className="h-[calc(100vh-64px)] w-full bg-[url('/main-menu/mainBG.png')] bg-center bg-cover bg-no-repeat pixelated relative flex flex-col items-center justify-center">
        <div className="h-60 w-full -bottom-36 absolute bg-gradient-to-b from-transparent from-0% via-green-900/90 via-50% to-transparent to-100% " />
        <div className="text-center px-4 py-8 bg-black bg-opacity-60 border-4 border-white shadow-xl max-w-4xl">
          <h1 className="text-3xl md:text-4xl mb-6 text-white animate-pulse flex flex-col items-center gap-1">
            <span>Data Structures</span>
            <span>and</span>
            <span>Algorithms </span>
            <span>Visualization</span>
          </h1>
          <p className="text-lg text-yellow-300 mb-8">
            Explore and learn with interactive visualizations
          </p>
          <div className="flex gap-6 justify-center">
            <button
              className="nes-btn is-primary pulse-effect px-6 py-3 text-md font-bold"
              onClick={scrollToGames}
            >
              <FontAwesomeIcon icon={faArrowDown} className="mr-2" size="xl" />
              Explore Games
            </button>
            <button
              className="nes-btn is-warning pulse-effect px-6 py-3 text-md font-bold"
              onClick={() => {
                setOpenCarousel(true);
                selectSound();
              }}
            >
              <FontAwesomeIcon icon={faGamepad} className="mr-2" size="xl" />
              Play Now
            </button>
            <a
              href="https://l.messenger.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DYO8nOmbCn-o&h=AT1v3aDUvoCLlbH4X-3rVqY543WtpvZG5v6QWpjk1ZgJfddNaLlo_V38wJTJzX5tzwPMeX5KFwhSACnIdXeGoOm7pYB1OHDVdJ19ZupqZg1M_1Ku9SzK--QZXBpf2XCc81r9vA"
              target="_blank"
            >
              <button className="nes-btn is-error pulse-effect px-6 py-3 text-md font-bold">
                <FontAwesomeIcon icon={faYoutube} className="mr-2" size="xl" />
                See Demo Video
              </button>
            </a>
          </div>
        </div>
        <div
          className="absolute bottom-10 animate-bounce"
          onClick={scrollToGames}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-white text-4xl cursor-pointer hover:text-yellow-300"
          />
        </div>
      </div>

      {/* Games Showcase Section */}
      <div
        ref={aboutSectionRef}
        className="min-h-screen w-full bg-[url('/main-menu/bg-landing.jpg')] bg-cover bg-center pixelated py-12 px-20"
      >
        <div className="container mx-auto">
          <div className="nes-container is-dark with-title mb-16">
            <p className="title bg-black px-4">Our Visualizations</p>
            <p className="text-center text-lg mb-8">
              Interactive games that demonstrate data structures and algorithms
            </p>

            <button
              className="nes-btn is-error mx-auto block px-8 py-3 text-lg font-bold"
              onClick={() => {
                setOpenCarousel(true);
                selectSound();
              }}
            >
              <FontAwesomeIcon icon={faPlay} className="mr-2" /> Draw Cards to
              Play
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {gameItems.map((game, index) => (
              <div
                key={index}
                className="nes-container bg-black/35 with-title relative hover:transform hover:scale-105 transition-all duration-300"
              >
                {/* <p className="text-center text-lg p-2">{game.title}</p> */}
                <div className="flip-card mb-4 h-96 ">
                  <div className="flip-card-inner">
                    <div className="flip-card-front overflow-hidden  flex justify-center items-center">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="h-full object-cover pixelated"
                      />
                    </div>
                    <div className="flip-card-back  bg-gray-900 flex flex-col justify-center items-center p-4">
                      <img src={game.ss} alt="Game screenshot" />
                      <p className="text-yellow-300 my-2 text-lg">
                        {game.title}
                      </p>
                      <p className="text-white  text-center">
                        {game.description}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="nes-btn is-primary w-full"
                  onClick={() => {
                    navigate(game.Link); // Changed to direct navigation
                    selectSound();
                  }}
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Carousel Overlay */}
      {openCarousel && (
        <>
          <div className="fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-75" />
          <FontAwesomeIcon
            icon={faX}
            size="2xl"
            className="z-30 fixed top-5 right-5 rounded-full p-3 text-white w-8 h-8 hover:bg-gray-500 hover:bg-opacity-60 transform ease-in-out active:scale-110 transition-all cursor-pointer"
            onClick={() => {
              setOpenCarousel(false);
              pingSound();
            }}
          />
          <div className="fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center">
            <Carousel items={gameItems} setOpenCarousel={setOpenCarousel} />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
