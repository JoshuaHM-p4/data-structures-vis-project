import { useRef, useEffect } from 'react';
import useSound from "../../hooks/useSound.js";

import hardHit from '../../assets/sounds/hard-hit.wav';

const QueueCanvas = ({ queue }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const carsRef = useRef([]);
  const carSize = 125;
  const canvasHeightRef = useRef(0);
  const removingCarRef = useRef({ index: -1 });
  const carsOutsideRef = useRef([]);

  // Sound effects
  const { playSound } = useSound();
  const playRev = () => playSound(hardHit);

  const updateCarY = () => {
    return canvasHeightRef.current / 2 - carSize / 2;
  }

  // Function for getting image paths
  const getImagePath = (type, color, isUtility) => {
    if (isUtility) {
      return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
    } else {
      return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
    }
  };

  useEffect(() => {
    const initializeCars = (queue, canvas) => {

      // Get existing cars from current state of the canvas
      const existingCars = carsRef.current.reduce((acc, car) => {
        acc[car.plateNumber] = car;
        return acc;
      }, {});

      // Clear cars off canvas if queue is empty and there are more than one car on the canvas
      if (queue.length == 0 && existingCars.length > 1 || existingCars.length == 0) {
        carsRef.current = [];
        imagesRef.current = {};
        return null;
      }

      // Find the index of car removed
      if (queue.length < carsRef.current.length) {

        const removedCarIndex = carsRef.current.findIndex(car => !queue.some(s => s.plateNumber === car.plateNumber));
        if (removedCarIndex !== -1) {
          console.log('Car removed at index: ', removedCarIndex, "which is", carsRef.current[removedCarIndex]);
          removingCarRef.current = { index: removedCarIndex };
          carsRef.current[removedCarIndex].removing = true; // Mark the car as removing
          carsRef.current[removedCarIndex].originalIndex = removedCarIndex; // Store original index

          // mark cars in front as parked: false
          carsRef.current.forEach((car, index) => {
            if (index < removedCarIndex) {
              car.parked = false;
            }
          });
        }
      }

      // Map new cars to the canvas
      const newCars = queue.map((car, index) => {
        if (existingCars[car.plateNumber]) {
          return existingCars[car.plateNumber];
        } else {

          return {
            plateNumber: car.plateNumber,
            order: car.order,
            type: car.type,
            color: car.color,
            isUtility: car.isUtility,
            image: null,
            y: updateCarY(),
            targetX: carSize * index, // Car Position in the queue
            x: canvas.width, // Start off the screen
            dx: 0,
            hovered: false,
            removing: false,
            parked: true,
          };
        }
      });

      // Add the cars that are being removed back to the array
      const removingCars = carsRef.current.filter(car => car.removing);
      carsRef.current = [...newCars];

      removingCars.forEach(car => {
        carsRef.current.splice(car.originalIndex, 0, car);
      });

      // Change targetX to other existing cars if a car in queue is removed
      if (removingCarRef.current.index !== -1) {
        carsRef.current.forEach((car) => {
          const queueIndex = queue.findIndex(qCar => qCar.plateNumber === car.plateNumber);
          if (queueIndex !== -1) {
            car.targetX = carSize * queueIndex;
          }
        });
      }

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
    const context = canvas.getContext('2d');
    let lastUpdateTime = 0;
    const fixedDeltaTime = 16; // Fixed time step in milliseconds (60 FPS)
    let animationFrameId;
    let mouse = { x: undefined, y: undefined };

    const MAX_SPEED = 25; // Maximum speed of the car
    const ACCELERATION = 1; // Acceleration rate
    const STOP_THRESHOLD = 3; // Distance within which the car should stop

    initializeCars(queue, canvas);


    // Update Car Position
    const update = () => {
      let isRemoving = removingCarRef.current.index !== -1

      // Refill the cars that are stored from outside
      if (!isRemoving && carsOutsideRef.current.length > 0) {
        const currentCarsLength = carsRef.current.length;
        carsOutsideRef.current.map((car, index) => {
          car.x = canvas.width + carSize * index;
          car.targetX = carSize * (currentCarsLength + index);
          car.parked = true;
          carsRef.current.push(car);
        })
        carsOutsideRef.current = [];
      }

      carsRef.current = carsRef.current.map((car, index) => {
        // Skip updating if the car is undefined or the image is not loaded
        if (!car || !car.image) return car;

        // Update x position based on the current canvas height
        car.y = updateCarY();

        // Remove the cars in front of the removed car when they are out of screen
        if (!car.parked && car.x + carSize <= 0) {
          carsOutsideRef.current.push(car);
          carsRef.current = carsRef.current.filter((_, i) => i !== removingCarRef.current.index);

          // update removingCarRef index
          removingCarRef.current.index -= 1;
          console.log('CHANGE CHANGE', removingCarRef.current.index);
          return null;
        }

        // Remove the car that is being removed when it is out of screen
        if (car.removing && car.x + carSize <= 0) {
          carsRef.current.filter((_, i) => i !== removingCarRef.current.index);
          removingCarRef.current.index = -1;
          return null;
        }

        // Move the car out of screen if it is being removed or if is a car (not parked) in front of the removed car
        if (car.removing || !car.parked) {
          car.dx = Math.min(car.dx + ACCELERATION, MAX_SPEED);
          car.x += car.dx * -1; // Accelerate the car to the left offscreen

        } else {
          // Move the car from initial position car.x to target position car.targetX
          // Calculate distance to the target position
          const distanceToTarget = Math.abs(car.targetX - car.x);
          const decelerationDistance = Math.max(distanceToTarget / 2, 50);

          // Determine if the car should be accelerating or decelerating
          if (distanceToTarget > decelerationDistance) {
            // Accelerate until the maximum speed is reached
            car.dx = Math.min(car.dx + ACCELERATION, MAX_SPEED);
          } else if (distanceToTarget > STOP_THRESHOLD) {
            // Decelerate as the car approaches the target position
            car.dx = Math.max(car.dx - ACCELERATION, 0);
          } else {
            // Stop the car if it is very close to the target position
            car.dx = 0;
            car.x = car.targetX; // Ensure the car's position is exactly at targetX
          }

          // Update car's position based on its dx (speed)
          car.x += car.dx * Math.sign(car.targetX - car.x);
        }


        // Check for mouse hover
        const isHovered = (mouse.x > car.x) && (mouse.x < car.x + carSize) && (mouse.y > car.y + carSize / 2) && (mouse.y < car.y + carSize);
        car.hovered = isHovered;

        return {
          ...car,
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
        // if (removingCarRef.current && originalIndex < removingCarRef.current.index && car.y <= canvas.height / 5) {
        //   return;
        // }

        let textPosition = { y: car.y - 10, x: car.x + carSize + 5 };

        // Draw line for guide on hover
        // if (car.hovered) {
        //   context.beginPath();
        //   context.moveTo(car.x + carSize / 2, car.y + carSize / 2);
        //   context.lineTo(car.x + carSize / 2, textPosition.y);
        //   context.strokeStyle = 'white';
        //   context.stroke();
        // }

        // // Draw car plate number on hover
        // if (car.hovered) {
        //   context.font = "18px Arial bold";
        //   context.fillStyle = 'white';
        //   context.fillText(`${car.plateNumber}`, textPosition.x, textPosition.y + 10);
        // }

        // Draw Car position (debug)
        // context.font = "18px 'Press Start 2P' bold";
        // context.fillStyle = 'white';
        // context.fillText(`[${car.plateNumber}] X: ${car.x} targetX: ${car.targetX} Parked:${car.parked}`, textPosition.x, textPosition.y);


        // Draw car image
        context.save();
        context.imageSmoothingEnabled = false; // Disable image smoothing
        context.drawImage(image, car.x, car.y, carSize, carSize); // Center the image on the vehicle's position and make it bigger
        context.restore();

        // Debugging Canvas
        // context.font = "18px Arial bold";
        // context.fillStyle = 'white';
        // context.fillText(`${canvas.height}`, 10, 20);

        // // Draw car boxes (debug)
        // context.beginPath();
        // context.rect(car.x, car.y, carSize, carSize); // bound by carSize
        // context.strokeStyle = 'yellow';
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

      // Store the canvas height in the ref
      canvasHeightRef.current = canvas.height;
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
        update(currentTime);
        draw();
      }
      // console.log(removingCarRef.current.index);
      // console.log(carsRef.current.map((car) => `${car.plateNumber} X: ${car.x} TX: ${car.targetX} ${car.parked ? 'parked' : 'outside'} ${car.removing ? 'removing' : ''}`), carsOutsideRef.current.map((car) => `${car.plateNumber} X: ${car.x} TX: ${car.targetX} ${car.parked ? 'parked' : 'outside'} ${car.removing ? 'removing' : ''}`));
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [queue]);

  return (
    <canvas ref={canvasRef} className="w-full"></canvas>
  );
};

export default QueueCanvas;