import React, { useState } from "react";
import Confetti from "react-confetti";
import useSound from "../hooks/useSound.js"

import pingSound from "../assets/sounds/ping.wav";
import resetSound from "../assets/sounds/move-up.wav";
import explodeSound from "../assets/sounds/explode.mp3";
import failSound from "../assets/sounds/fail.wav";
import jingleWin from "../assets/sounds/jingle-win.wav";

// Define the TicTacToe component
const TicTacToe = () => {
  // State for the game
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 board initialized with null
  const [currentPlayer, setCurrentPlayer] = useState("X"); // X goes first
  const [gameStatus, setGameStatus] = useState("Player X's Turn"); // Initial game status
  const [winningCombo, setWinningCombo] = useState([]); // State to store the winning combination

  // Custom hook to play sound
  const { playSound } = useSound();

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
    if (board[index] || gameStatus.includes("wins")) return; // Ignore click if cell is already filled or game is over
    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer; // Update the clicked cell with the current player's symbol
    setBoard(updatedBoard); // Update the board state

    const result = checkWinner(updatedBoard); // Check for a winner

    if (result) {
      if (result === "Draw") {
        setGameStatus("It's a Draw!");
        playSound(failSound);
      } else {
        const { winner, combination } = result;
        setWinningCombo(combination); // Set the winning combination
        setGameStatus(`Player ${winner} wins!`);
        playSound(explodeSound);
        playSound(jingleWin);
      }
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      setCurrentPlayer(nextPlayer);
      setGameStatus(`Player ${nextPlayer}'s Turn`);
      playSound(pingSound); // Play the sound
    }
  };

  // Restart the game
  const restartGame = () => {
    setBoard(Array(9).fill(null)); // Reset the board
    setCurrentPlayer("X"); // Set X as the starting player
    setGameStatus("Player X's Turn"); // Reset the game status
    setWinningCombo([]); // Reset the winning combination
    playSound(resetSound);
  };


  return (
    <div className="flex flex-col items-center justify-evenly h-full relative">
      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
      <div className="text-lg">{gameStatus}</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`w-20 h-20 flex items-center justify-center text-2xl font-bold border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black active:opacity-90 ${
              Array.isArray(winningCombo) && winningCombo.includes(index)
              ? "bg-red-600 text-black hover:bg-red-800 hover:text-white"
              : "bg-black"
            }`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        className="nes-btn is-primary mt-4"
        onClick={restartGame}
      >
        Restart Game
      </button>
      {gameStatus.includes("wins") && <Confetti className="w-full h-full"/>}
    </div>
  );
};

export default TicTacToe;