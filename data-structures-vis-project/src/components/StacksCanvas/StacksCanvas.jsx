import { useRef, useEffect } from 'react';

const StacksCanvas = ({ stack }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const carsRef = useRef([]);

  // Function for getting image paths
  const getImagePath = (type, color, isUtility) => {
    if (isUtility) {
      return `/vehicles/UTILITY/${type.toUpperCase()}.png`;
    } else {
      return `/vehicles/${type.toUpperCase()}/${color.toUpperCase()}.png`;
    }
  };

  useEffect(() => {
    const initializeCars = (stack) => {
      if (stack.length === 0) {
        carsRef.current = [];
        imagesRef.current = {};
        return;
      }

      const existingCars = carsRef.current.reduce((acc, car) => {
        acc[car.plateNumber] = car;
        return acc;
      }, {});

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
            x: 500,
            y: 10 + index * 260, // Space out cars by 260 pixels
            dy: 1
          };
        }
      });

      carsRef.current = newCars;

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

    initializeCars(stack);

    const canvas = canvasRef.current;
    const gravity = 0.5;
    const friction = 0.7;
    const context = canvas.getContext('2d');
    let lastUpdateTime = 0;
    const controlSpeedMultiplier = 0.1;
    const fixedDeltaTime = 16; // Fixed time step in milliseconds (60 FPS)
    const energyThreshold = 1; // Threshold to stop the car
    let animationFrameId;

    // Canvas Resize
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Update Car Position
    const update = () => {
      carsRef.current = carsRef.current.map((car, index) => {
        // Limit dy to a reasonable value
        const maxDy = 10;
        car.dy = Math.min(Math.max(car.dy, -maxDy), maxDy);

        // Update y position
        let newY = car.y + car.dy * fixedDeltaTime * controlSpeedMultiplier;

        // Ensure y position doesn't go beyond the canvas height
        if (newY + 250 > canvas.height) {
          newY = canvas.height - 250;
          car.dy = -car.dy * friction; // Reverse direction and apply damping from friction
          if (Math.abs(car.dy) < energyThreshold) {
            car.dy = 0; // Stop the car if energy is below the threshold
          }
        } else {
          car.dy += gravity;
        }

        // Check for collision with other cars
        carsRef.current.forEach((otherCar, otherIndex) => {
          if (index !== otherIndex && newY + 50 > otherCar.y && car.y < otherCar.y) {
            newY = otherCar.y - 50;
            car.dy = -car.dy * friction; // Reverse direction and apply damping from friction
            if (Math.abs(car.dy) < energyThreshold) {
              car.dy = 0; // Stop the car if energy is below the threshold
            }
          }
        });

        return {
          ...car,
          y: newY,
        };
      });
    };

    // Car Draw
    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Reverse the order of cars array and then render
      [...carsRef.current].reverse().forEach((car) => {
        const image = imagesRef.current[car.plateNumber];
        if (!image) return; // Ensure images are loaded
        context.save();
        context.imageSmoothingEnabled = false; // Disable image smoothing
        context.drawImage(image, car.x, car.y, 250, 250); // Center the image on the vehicle's position and make it bigger
        context.restore();
      });
    };

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