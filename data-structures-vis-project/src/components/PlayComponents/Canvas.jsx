import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

const Canvas = forwardRef(function Canvas({ gameState, setGameState }, ref) {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const initialVehicleState = {
    x: 100,
    y: 100,
    velocity: 0,
    acceleration: 0,
    direction: 0, // Angle in degrees
  };
  const [vehicleState, setVehicleState] = useState(initialVehicleState);

  useImperativeHandle(ref, () => ({
    setAcceleration: (acceleration) => {
      setVehicleState((prevState) => ({
        ...prevState,
        acceleration: acceleration,
      }));
    },
    turn: (angle) => {
      setVehicleState((prevState) => ({
        ...prevState,
        direction: (prevState.direction + angle) % 360, // Limit direction to 360 degrees
      }));
    },
    resetVehicleState: () => {
      setVehicleState(initialVehicleState);
    },
  }));

  const getDirection = (angle) => {
    const directions = ["EAST", "SOUTHEAST", "SOUTH", "SOUTHWEST", "WEST", "NORTHWEST", "NORTH", "NORTHEAST"];
    const normalizedAngle = ((angle % 360) + 360) % 360; // Normalize angle to be within 0-359 degrees
    const index = Math.round(normalizedAngle / 45) % 8;
    return directions[index];
  };

  const getImagePaths = (type, color, direction, isUtility) => {
    if (isUtility) {
      return `/sprites/${type.toUpperCase()} TOPDOWN/MOVE/${direction}/SEPARATED`;
    } else {
      return `/sprites/${type.toUpperCase()} TOPDOWN/${color}/MOVE/${direction}/SEPARATED`;
    }
  };

  const generateImageFilenames = (color, type, direction, count, isUtility) => {
    const filenames = [];
    for (let i = 0; i < count; i++) {
      const index = i.toString().padStart(3, '0');
      const filename = isUtility ? `${type.toUpperCase()}_CLEAN_${direction}_${index}.png` : `${color}_${type}_CLEAN_${direction}_${index}.png`;
      filenames.push(filename);
    }
    return filenames;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match parent div
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const loadImages = (paths, callback) => {
      let images = [];
      let loadedImages = 0;
      paths.forEach((path, index) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          loadedImages++;
          images[index] = img;
          if (loadedImages === paths.length) {
            callback(images);
          }
        };
      });
    };

    const draw = (images) => {
      if (images.length === 0) return; // Ensure images are loaded
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[currentFrame];
      context.save();
      context.translate(vehicleState.x, vehicleState.y);
      context.imageSmoothingEnabled = false; // Disable image smoothing
      context.drawImage(img, -50, -50, 250, 250); // Center the image on the vehicle's position and make it bigger
      context.restore();
    };

    const updateVehicleState = () => {
      setVehicleState((prevState) => {
        const newVelocity = prevState.velocity + prevState.acceleration;
        const cappedVelocity = Math.min(Math.max(newVelocity, -5), 5); // Cap velocity between -5 and 5
        const radians = (prevState.direction * Math.PI) / 180;
        let newX = prevState.x + cappedVelocity * Math.cos(radians);
        let newY = prevState.y + cappedVelocity * Math.sin(radians);

        // Wrap around the screen
        if (newX > canvas.width) newX = 0;
        if (newX < 0) newX = canvas.width;
        if (newY > canvas.height) newY = 0;
        if (newY < 0) newY = canvas.height;

        const newSpriteDirection = getDirection(prevState.direction);

        return {
          ...prevState,
          x: newX,
          y: newY,
          velocity: cappedVelocity,
          direction: prevState.direction,
          spriteDirection: newSpriteDirection,
        };
      });
    };

    const vehicle = gameState.vehicleUtility === 'None' ? gameState.vehicleType : gameState.vehicleUtility;
    const color = gameState.vehicleColor;
    const isUtility = gameState.vehicleUtility !== 'None';
    const frameCount = 10;

    const direction = getDirection(vehicleState.direction);
    const imagePaths = getImagePaths(vehicle, color, direction, isUtility);
    const imageFiles = generateImageFilenames(color, vehicle.toUpperCase(), direction, frameCount, isUtility);
    const fullPaths = imageFiles.map(file => `${imagePaths}/${file}`);

    loadImages(fullPaths, (loadedImages) => {
      setImages(loadedImages);
    });

    let animationFrameId;

    const animationLoop = () => {
      if (gameState.isRunning) {
        updateVehicleState();
        draw(images);
        setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
        animationFrameId = requestAnimationFrame(animationLoop);
      }
    };

    if (gameState.isRunning) {
      animationFrameId = requestAnimationFrame(animationLoop);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [gameState, currentFrame, vehicleState, gameState.vehicleType, gameState.vehicleUtility]);

  return (
    <div className="h-full w-full">
      <canvas ref={canvasRef} className="w-full"></canvas>
    </div>
  );
});

export default Canvas;