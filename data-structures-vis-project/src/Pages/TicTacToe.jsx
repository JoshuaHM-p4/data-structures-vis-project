import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useSound from "../hooks/useSound.js";

import pingSound from "../assets/sounds/ping.wav";
import resetSound from "../assets/sounds/move-up.wav";
import explodeSound from "../assets/sounds/explode.mp3";
import failSound from "../assets/sounds/fail.wav";
import jingleWin from "../assets/sounds/jingle-win.wav";

import Modal from '../components/StackQueueModal/Modal.jsx';

// Define the TicTacToe component
const TicTacToe = () => {
  // State for the game
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board initialized with null
  const [currentPlayer, setCurrentPlayer] = useState("X"); // X goes first
  const [gameStatus, setGameStatus] = useState("Player X's Turn"); // Initial game status
  const [winningCombo, setWinningCombo] = useState([]); // State to store the winning combination
  const [pressedState, setPressedState] = useState(Array(9).fill(false));

  const [XHealth, setXHealth] = useState(100);
  const [OHealth, setOHealth] = useState(100);
  const [round, setRound] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [champion, setChampion] = useState('');

  // Custom hook to play sound
  const { playSound } = useSound();

  // Dictionary of background images
  const backgroundImages = {
    0: '/tictactoe/background/bg-1.gif',
    1: '/tictactoe/background/bg-2.gif',
    2: '/tictactoe/background/bg-3.gif',
    3: '/tictactoe/background/bg-4.gif',
    4: '/tictactoe/background/bg-5.gif',
  };

  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(backgroundImages[0]);
  const [nextBackgroundImage, setNextBackgroundImage] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setCurrentBackgroundImage(nextBackgroundImage);
        setIsTransitioning(false);
      }, 150); // Duration of the fade-out transition
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning, nextBackgroundImage]);

  const changeBackgroundImage = (newImageUrl) => {
    setNextBackgroundImage(newImageUrl);
    setIsTransitioning(true);
  };

  // Winning combinations
  const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for winner or draw
  const checkWinner = (board) => {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combination: combo }; // Return winner and the winning combo
      }
    }
    return board.every((cell) => cell !== null) ? "Draw" : null; // Return "Draw" if all cells are filled, otherwise null
  };

  // Handle cell click
  const handleCellClick = (index) => {
    if (gameStatus.includes("wins")) return; // Ignore click if the game is over

    // Set the pressed state for the button
    const updatedPressedState = [...pressedState];
    updatedPressedState[index] = true;
    setPressedState(updatedPressedState);

    // If the cell is already filled, just reset the pressed state after a short delay
    if (board[index]) {
      setTimeout(() => {
        const resetPressedState = [...pressedState];
        resetPressedState[index] = false;
        setPressedState(resetPressedState);
        playSound(pingSound); // Play the sound
      }, 100); // Adjust the delay as needed
      return;
    }

    // Update the board after a short delay to show the pressed state
    setTimeout(() => {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer; // Update the clicked cell with the current player's symbol
      setBoard(updatedBoard); // Update the board state

      const result = checkWinner(updatedBoard); // Check for a winner

      if (result) {
        if (result === "Draw") {
          setGameStatus("It's a Draw!");
          playSound(failSound);
          handleModalOpen("It's a Draw!");
        } else {
          const { winner, combination } = result;
          setWinningCombo(combination); // Set the winning combination
          setGameStatus(`Player ${winner} wins!`);
          playSound(explodeSound);
          playSound(jingleWin);
          checkGameProgress(winner);
        }
      } else {
        const nextPlayer = currentPlayer === "X" ? "O" : "X";
        setCurrentPlayer(nextPlayer);
        setGameStatus(`Player ${nextPlayer}'s Turn`);
        playSound(pingSound); // Play the sound
      }

      // Reset the pressed state after updating the board
      const resetPressedState = [...pressedState];
      resetPressedState[index] = false;
      setPressedState(resetPressedState);
    }, 200); // Adjust the delay as needed
  };

  const checkGameProgress = (winner) => {
    const updatedXHealth = winner === "O" ? XHealth - 20 : XHealth;
    const updatedOHealth = winner === "X" ? OHealth - 20 : OHealth;
    
    setXHealth(updatedXHealth);
    setOHealth(updatedOHealth);

    if (updatedXHealth <= 0 || updatedOHealth <= 0) {
      setChampion(winner);
      handleModalOpen(`Player ${winner} wins the game! Restarting...`);
    } else {
      handleModalOpen(`Player ${winner} wins the round!`);
    }
  };
  
  // Change Round
  const changeRound = () => {
    changeBackgroundImage(backgroundImages[round  % 5]);
    setBoard(Array(9).fill(null)); // Reset the board
    setCurrentPlayer("X"); // Set X as the starting player
    setGameStatus("Player X's Turn"); // Reset the game status
    setWinningCombo([]); // Reset the winning combination
    setPressedState(Array(9).fill(false)); // Reset the pressed state
    setRound(round + 1);
    playSound(resetSound);
  };

  // Modal functions
  const handleModalClose = () => {
    setIsModalOpen(false);
    if (champion) {
      declareWinner();
    } else {
    setTimeout(changeRound, 1000); // Delay before changing the round
    }
  };

  const handleModalOpen = (message) => {
    setAlertMessage(message);
    setIsModalOpen(true);
  };

  const declareWinner = () => {
    setTimeout(() => {
      resetGame();
      setIsModalOpen(false);
    }, 1000 ); // Delay before restarting the game
  };

  const resetGame = () => {
    setXHealth(100);
    setOHealth(100);
    setRound(1); // Directly reset the round to 1
    setBoard(Array(9).fill(null)); // Reset the board
    setCurrentPlayer("X"); // Reset the current player to X
    setGameStatus("Player X's Turn"); // Reset the game status
    setWinningCombo([]); // Clear the winning combination
    setPressedState(Array(9).fill(false)); // Reset the pressed state
    setCurrentBackgroundImage(backgroundImages[0]); // Reset to the initial background image
    playSound(resetSound); // Play reset sound
  };
  

  // Dictionary to map cell values to image URLs
  const imageMap = {
    null: '/tictactoe/default.png',
    X: '/tictactoe/x-button.png',
    O: '/tictactoe/o-button.png',
    nullPressed: '/tictactoe/default-pressed.png',
    XPressed: '/tictactoe/x-button-pressed.png',
    OPressed: '/tictactoe/o-button-pressed.png',
  };

  return (
    <div className='flex flex-col items-center justify-around h-full'
    style={{
      backgroundImage: `url(${isTransitioning ? nextBackgroundImage : currentBackgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      animation: isTransitioning ? 'fadeOut 0.2s ease-in-out' : 'fadeIn 0.2s ease-in-out',
    }}
    >
      <div className="flex justify-between w-full pt-2">
        {/* Left */}
        {/* Health Bar for X Player */}
        <div className="flex flex-col items-start w-full p-2">
          <progress
            className={`nes-progress h-5 w-full ${
              XHealth < 25 ? 'is-error' : XHealth < 50 ? 'is-warning' : 'is-success'
            }`}
            value={XHealth}
            max="100"
          ></progress>
          <h1 className="text-xl font-bold pl-2">Player X</h1>
        </div>
        {/* Middle */}
        <div className="flex flex-col items-center w-3/4 justify-center">
          <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
          <p className="text-lg">{gameStatus}</p>
          <p className="text-lg">Round: {round}</p>
        </div>
        {/* Right */}
        {/* Health Bar for O Player */}
        <div className="flex flex-col items-end w-full p-2">
          <progress
            className={`nes-progress h-5 w-full ${
              OHealth < 25 ? 'is-error' : OHealth < 50 ? 'is-warning' : 'is-success'
            }`}
            value={OHealth}
            max="100"
          ></progress>
          <h1 className="text-xl font-bold pr-2">Player O</h1>
        </div>
      </div>
      {/* Game Board */}
      <div className="flex flex-col h-full w-full items-center justify-center relative">
        <div className="grid grid-cols-3 ">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`nes-pointer p-1 w-28 h-28 flex items-center text-center justify-center text-4xl font-["Gluten"] hover:bg-gray-200 hover:text-black active:opacity-90 focus:outline-none   
              ${
                Array.isArray(winningCombo) && winningCombo.includes(index)
                  ? "bg-red-600 text-black hover:bg-red-800 hover:text-white"
                  : "bg-transparent"
              } ${
                index === 1 ? "border-r-4 border-l-4" :
                index === 3 ? "border-y-4" :
                index === 4 ? "border-4" :
                index === 5 ? "border-t-4 border-b-4" :
                index === 7 ? "border-x-4" : ""
              }`}
              onClick={() => handleCellClick(index)}
            >
              <img
                src={
                  pressedState[index]
                    ? imageMap[cell + "Pressed"]  // Use the pressed version of the image
                    : imageMap[cell]              // Use the normal version
                }
                className="h-full image-rendering"
                alt={`${cell || 'blank'}-button`}
              />
            </button>
          ))}
        </div>

        <img src="/tictactoe/character-1.gif" className="absolute bottom-0 left-20" />
        <img src="/tictactoe/character-2.gif" className="absolute bottom-0 right-20 transform scale-x-[-1]" />
      </div>
      {/* {gameStatus.includes("wins") && <Confetti className="w-full h-full"/>} */}

      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
        alertMessage={alertMessage}
        mode="alert"
      />
    </div>
  );
};

export default TicTacToe; 