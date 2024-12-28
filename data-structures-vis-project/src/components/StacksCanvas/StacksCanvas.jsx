import { useRef, useEffect } from 'react';
import useSound from "../../hooks/useSound.js";

import hardHit from '../../assets/sounds/hard-hit.wav';
import softHit from '../../assets/sounds/soft-hit.wav';

const StacksCanvas = ({ stack }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const carsRef = useRef([]);
  const carSize = 250;
  const canvasWidthRef = useRef(0);
  const removingCarRef = useRef(null);

  // Sound effects
  const { playSound } = useSound();
  const playHardHit = () => playSound(hardHit);
  const playSoftHit = () => playSound(softHit);

  // Function for getting image paths
  const getImagePath = (type, color, isUtility) => {
    if (isUtility) {
      return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
    } else {
      return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
    }
  };

  useEffect(() => {
    const initializeCars = (stack, canvas) => {
      if (stack.length === 0) {
        carsRef.current = [];
        imagesRef.current = {};
        return;
      }

      // Get existing cars from current state of the canvas
      const existingCars = carsRef.current.reduce((acc, car) => {
        acc[car.plateNumber] = car;
        return acc;
      }, {});

      // Detect car removal
      if (stack.length < carsRef.current.length) {
        const removedCarIndex = Object.keys(existingCars).findIndex(plateNumber => !stack.some(s => s.plateNumber === plateNumber));
        if (removedCarIndex !== -1) {
          removingCarRef.current = { index: removedCarIndex };
          carsRef.current[removedCarIndex].removing = true; // Mark the car as removing
          carsRef.current[removedCarIndex].originalIndex = removedCarIndex; // Store original index
        }
      }

      console.log(removingCarRef.current);

      // Map new cars to the canvas
      const newCars = stack.map((car, index) => {
        if (existingCars[car.plateNumber]) {
          return existingCars[car.plateNumber];
        } else {
          return {
            plateNumber: car.plateNumber,
            type: car.type,
            color: car.color,
            isUtility: car.isUtility,
            image: null,
            x: canvas.width / 2 - 125,
            y: 10 + index * 260, // Space out cars by 260 pixels
            dy: 1,
            hovered: false,
            removing: false,
            hasCollided: false // Add hasCollided property
          };
        }
      });

      // Add the cars that are being removed back to the array
      const removingCars = carsRef.current.filter(car => car.removing);
      carsRef.current = [...newCars];

      removingCars.forEach(car => {
        carsRef.current.splice(car.originalIndex, 0, car);
      });

      // Load Image Function
      const loadImage = (path, callback) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          callback(img);
        };
      };

      // Load images for new cars
      newCars.forEach((car) => {
        if (!car.image) {
          loadImage(getImagePath(car.type, car.color, car.isUtility), (loadedImage) => {
            imagesRef.current[car.plateNumber] = loadedImage;
            car.image = loadedImage;
          });
        }
      });
    };


    const canvas = canvasRef.current;
    const gravity = 0.5;
    const friction = 0.35;
    const context = canvas.getContext('2d');
    let lastUpdateTime = 0;
    const controlSpeedMultiplier = 0.1;
    const fixedDeltaTime = 16; // Fixed time step in milliseconds (60 FPS)
    const energyThreshold = 1; // Threshold to stop the car
    let animationFrameId;
    const groundCollisionBuffer = 200;
    const carCollisionBuffer = 50;
    let mouse = { x: undefined, y: undefined };

    initializeCars(stack, canvas);

    // Update Car Position
    const update = () => {
      carsRef.current = carsRef.current.map((car, index) => {
        // Skip updating if the car is undefined or the image is not loaded
        if (!car || !car.image) return car;

        // Update x position based on the current canvas width
        car.x = canvasWidthRef.current / 2 - 125;

        // Check if the removing car has reached the top
        if (removingCarRef.current) {
          if (removingCarRef.current.index === index && car && car.y <= 250) {
            // filter out the car from the array
            carsRef.current.filter((_, i) => i !== removingCarRef.current.index);
            removingCarRef.current = null; // Stop removing car
            return null; // Return null to remove the car from the array
          }
        }

        // Apply different physics if a car is being removed
        if (car.removing || (removingCarRef.current && index < removingCarRef.current.index)) {
          // Apply faster negative gravity
          car.dy = -Math.abs(car.dy) * 2.1;

          // Limit dy to a reasonable value for negative gravity
          const maxNegativeDy = -20; // Example value, adjust as needed
          const minNegativeDy = 0 ; // Example value, adjust as needed
          car.dy = Math.max(Math.min(car.dy, minNegativeDy), maxNegativeDy);
        } else {
          // Limit dy to a reasonable value
          const maxDy = 20;
          car.dy = Math.min(Math.max(car.dy, -maxDy), maxDy);
        }

        // Update y position
        let newY = car.y + car.dy * fixedDeltaTime * controlSpeedMultiplier;

        // Ensure y position doesn't go beyond the canvas height
        if (newY + groundCollisionBuffer > canvas.height) {
          newY = canvas.height - groundCollisionBuffer;
          if (!car.hasCollided && Math.abs(car.dy) > 5) { // Check velocity threshold
            playHardHit(); // Play hard hit sound on ground collision
            car.hasCollided = true; // Mark the car as having collided
          }
          car.dy = -car.dy * friction; // Reverse direction and apply damping from friction
          if (Math.abs(car.dy) < energyThreshold) {
            car.dy = 0; // Stop the car if energy is below the threshold
          }
        } else if (newY < 0) {
          // ensure y position doesnt go below 0
          newY = 0;
          car.dy = 0;
        } else {
          car.dy += gravity;
          car.hasCollided = false; // Reset collision status when in the air
        }

        // Check for collision with other cars
        carsRef.current.forEach((otherCar, otherIndex) => {
          if (index !== otherIndex && newY + carCollisionBuffer > otherCar.y && car.y < otherCar.y) {
            newY = otherCar.y - carCollisionBuffer;
            if (!car.hasCollided && Math.abs(car.dy) > 5) { // Check velocity threshold
              playSoftHit(); // Play soft hit sound on car collision
              car.hasCollided = true; // Mark the car as having collided
            }
            car.dy = -car.dy * friction; // Reverse direction and apply damping from friction
            if (Math.abs(car.dy) < energyThreshold) {
              car.dy = 0; // Stop the car if energy is below the threshold
            }
          }
        });

        // Check for mouse hover
        const isHovered = (mouse.x > car.x) && (mouse.x < car.x + carSize * 1.5) && (mouse.y > car.y + carSize / 2) && (mouse.y < car.y + carSize);
        car.hovered = isHovered;

        return {
          ...car,
          y: newY,
        };
      }).filter(car => car !== null); // Filter out removed cars
    };

    // Car Draw
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Reverse the order of cars array and then render
      [...carsRef.current].reverse().forEach((car, index) => {
        const image = imagesRef.current[car.plateNumber];
        if (!image) return; // Ensure images are loaded

        const originalIndex = carsRef.current.length - 1 - index;

        // Temporarily hide cars above the removed car
        if (removingCarRef.current && originalIndex < removingCarRef.current.index && car.y < 300) {
          return;
        }

        let textPosition = { x: car.x + 10 + carSize, y: car.y + carSize / 2 + 25 };

        // Draw line for guide on hover
        if (car.hovered) {
          context.beginPath();
          context.moveTo(car.x + carSize / 2, textPosition.y);
          context.lineTo(textPosition.x, textPosition.y);
          context.strokeStyle = 'white';
          context.stroke();
        }

        // Draw car plate number on hover
        if (car.hovered) {
          context.font = "18px Arial bold";
          context.fillStyle = 'white';
          context.fillText(`${car.plateNumber}`, textPosition.x, textPosition.y);
        }

        // Draw car image
        context.save();
        context.imageSmoothingEnabled = false; // Disable image smoothing
        context.drawImage(image, car.x, car.y, carSize, carSize); // Center the image on the vehicle's position and make it bigger
        context.restore();

        // // Draw car boxes
        // context.beginPath();
        // context.rect(car.x, car.y, carSize, carSize); // bound by carSize
        // context.strokeStyle = 'red';
        // context.stroke();

        // context.beginPath();
        // context.rect(car.x, car.y + (carSize) / 5, carSize, carSize / 2);
        // context.strokeStyle = car.hovered ? 'white' : 'transparent';
        // context.stroke();
      });
    };

    // Canvas Resize
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;

      // Store the canvas width in the ref
      canvasWidthRef.current = canvas.width;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    const render = (currentTime) => {
      const deltaTime = currentTime - lastUpdateTime;
      lastUpdateTime = currentTime;

      if (deltaTime >= fixedDeltaTime) {
        update();
        draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stack]);

  return (
    <canvas ref={canvasRef} className="w-full"></canvas>
  );
};

export default StacksCanvas;