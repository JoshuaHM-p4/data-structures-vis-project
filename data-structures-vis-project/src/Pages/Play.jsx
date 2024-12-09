import React, { useState, useEffect, useRef } from 'react';
import Canvas from '../components/PlayComponents/Canvas.jsx';

const initialGameState = {
  isRunning: true,
  vehicleColor: 'Black',
  vehicleUtility: 'None',
  vehicleType: 'Civic',
};

const Play = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        canvasRef.current.setAcceleration(0.1); // Accelerate
      } else if (event.key === 'ArrowDown') {
        canvasRef.current.setAcceleration(-0.1); // Decelerate
      } else if (event.key === 'ArrowRight') {
        canvasRef.current.turn(5); // Turn right
      } else if (event.key === 'ArrowLeft') {
        canvasRef.current.turn(-5); // Turn left
      }

      // press R
      if (event.key === 'r') {
        canvasRef.current.resetVehicleState();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        canvasRef.current.setAcceleration(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (gameState.isRunning) {
        // Update game state here
      }
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.isRunning]);

  const resetGame = () => {
    setGameState(initialGameState);
    canvasRef.current.resetVehicleState();
    canvasRef.current.resetVehicleState();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameState((prevState) => {
      const newState = { ...prevState, [name]: value };
      if (name === 'vehicleType' || name === 'vehicleUtility') {
        canvasRef.current.resetVehicleState();
      }
      return newState;
    });
  };

  const options = {
    vehicleColor: ["Black", "Blue", "Brown", "Green", "Magenta", "Red", "White", "Yellow"],
    vehicleUtility: ["None", "Ambulance", "Taxi", "Police"],
    vehicleType: [
      "Bus", "Box Truck", "Camper", "Civic", "Hatchback", "Jeep", "Limo", "Luxury", "Medium Truck", "Micro", "Minivan", "Musclecar",
      "Pickup", "Sedan", "Sport", "Supercar", "SUV", "Van", "Wagon"
    ]
  };

  return (
    <div className="w-full h-full">
      <div className='absolute top-16 left-0 flex gap-4 z-10'>
        <h1 className="text-2xl font-bold text-center">PLAY</h1>
        <button onClick={() => setGameState({ ...gameState, isRunning: !gameState.isRunning })}>
          {gameState.isRunning ? 'Pause' : 'Resume'}
        </button>
        <button onClick={resetGame}>Reset</button>
        {Object.keys(options).map((key) => (
          <select className="bg-neutral-950" key={key} name={key} value={gameState[key]} onChange={handleChange}>
            {options[key].map((option) => (
              <option className="text-slate-400" key={option} value={option}>{option}</option>
            ))}
          </select>
        ))}
      </div>
      <Canvas ref={canvasRef} gameState={gameState} setGameState={setGameState} />
    </div>
  );
}

export default Play;