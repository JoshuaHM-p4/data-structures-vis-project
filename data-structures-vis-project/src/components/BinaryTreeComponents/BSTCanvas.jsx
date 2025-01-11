/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import useSound from "../../hooks/useSound.js";

import mapMusic from '../../assets/sounds/smw_map_yoshi_island.mp3';
import mapMoveSound from '../../assets/sounds/smw_map_move_to_spot.wav';
import traversalDoneSound from '../../assets/sounds/smw_1-up.wav';

const BSTCanvas = ({ tree, traversal }) => {
  const canvasRef = useRef(null);
  const nodeSize = 30;
  const canvasHeightRef = useRef(0);

  const { playSound } = useSound();
  const mapMusicAudioRef = useRef(null);

  const playMapMusic = () => {
    mapMusicAudioRef.current = playSound(mapMusic, { volume: 0.5, loop: true });
  };

  const stopMapMusic = () => {
    if (mapMusicAudioRef.current) {
      mapMusicAudioRef.current.pause();
      mapMusicAudioRef.current.currentTime = 0;
      mapMusicAudioRef.current = null;
    }
  };

  const playTraversalSound = () => { playSound(mapMoveSound); };
  const playTraversalDoneSound = () => { playSound(traversalDoneSound); };

  useEffect(() => {
    playMapMusic();
    return () => {
      stopMapMusic();
    };
  }, []);



  useEffect(() => {

    const xScale = 0.75;
    const yGap = 100;

    const loadImageFrames = (imagePaths, filename, numFrames) => {
      let images = [];
      let loadedImages = 0;

      if (numFrames === 0) {
        const image = new Image();
        image.src = `${imagePaths}/${filename}.png`;
        images.push(image);
        return images;
      }

      for (let i = 0; i < numFrames; i++) {
        const image = new Image();
        image.src = `${imagePaths}/${filename}${i}.png`;
        images.push(image);
      }
      return images;
    };

    const marioFrames = {
      North: loadImageFrames('/world-mario', 'WorldMario_North', 2),
      South: loadImageFrames('/world-mario', 'WorldMario_South', 2),
      East: loadImageFrames('/world-mario', 'WorldMario_East', 2),
      West: loadImageFrames('/world-mario', 'WorldMario_West', 2),
      Done: loadImageFrames('/world-mario', 'WorldMarioDone', 0)
    };

    const backgroundElements = {
      hill: loadImageFrames('/background', 'bg-hill', 0),
      hillSmall: loadImageFrames('/background', 'bg-hill-sm', 0),
      rock: loadImageFrames('/background', 'bg-rock', 0),
    }

    const generateRandomPositions = (numElements, canvasWidth, canvasHeight, position, minDistance) => {
      const randomPositions = [];
      for (let i = 0; i < numElements; i++) {
        let validPosition = false;
        let x, y;

        while (!validPosition) {
          x = Math.random() * canvasWidth;
          y = Math.random() * canvasHeight;
          validPosition = true;

          for (const node of position) {
            const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
            if (distance < minDistance) {
              validPosition = false;
              break;
            }
          }
        }

        randomPositions.push({ x, y });
      }
      return randomPositions;
    };

    const initializeTree = (tree, canvas) => {
      if (!tree?.root) return null;

      const positions = [];
      const canvasWidth = canvas.width;

      const assignPositions = (node, depth, xStart, xEnd, path = '') => {
        if (!node) return;

        const x = (xStart + xEnd) / 2 * xScale + (1 - xScale) * canvasWidth / 2;
        const y = depth * yGap + nodeSize + 50;
        const id = path + (path ? '-' : '') + node.value;

        positions.push({ id, value: node.value, x, y, applied: false });

        assignPositions(node.left, depth + 1, xStart, x, id + '-L');
        assignPositions(node.right, depth + 1, x, xEnd, id + '-R');
      };

      assignPositions(tree?.root, 0, 0, canvasWidth);

      // Adjust canvas height based on the tree's height
      const maxDepth = Math.max(...positions.map(pos => pos.y));
      canvas.height = maxDepth + yGap;

      return positions;
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let positions = initializeTree(tree, canvas);

    let lastUpdateTime = 0;
    const fixedDeltaTime = 16;
    let animationFrameId;
    let mouse = { x: undefined, y: undefined };

    const rootImageFrames = loadImageFrames('/node', 'nodeSpriteRoot', 0);
    const nodeImageFrames = loadImageFrames('/node', 'nodeSprite', 3);

    let currentFrame = 0;
    const frameCount = 3;
    let frameDelay = 0;
    const frameDelayThreshold = 15;

    let marioPosition = { x: 0, y: 0 }

    const backgroundElementSize = 45;
    const minDistance = backgroundElementSize * 2.5;
    const backgroundElementCount = 10;
    let hillPositions = [];
    let hillSmallPositions = [];
    let rockPositions = [];

    if (positions) {
      marioPosition = { x: positions[0].x, y: positions[0].y };
      hillPositions = generateRandomPositions(backgroundElementCount, canvas.width, canvas.height, positions, minDistance);
      hillSmallPositions = generateRandomPositions(backgroundElementCount, canvas.width, canvas.height, positions, minDistance);
      rockPositions = generateRandomPositions(backgroundElementCount, canvas.width, canvas.height, positions, minDistance);
    }

    let marioFrameIndex = 0;
    let marioFrameDelay = 0;
    const marioFrameDelayThreshold = 10;
    let marioDirection = 'South';

    let traversalDonePlayed = false;

    const update = () => {
      if (!positions || !positions.length || !tree?.root) return;

      const traversalOrder = generateTraversalOrder(positions, traversal);
      let index = 0;

      const applyTraversal = () => {
        if (index < traversalOrder.length) {
          const nodeId = traversalOrder[index];
          const node = positions.find(pos => pos.id === nodeId);
          if (node && !node.applied) {
            node.applied = true;
            const startX = marioPosition.x;
            const startY = marioPosition.y;
            const endX = node.x;
            const endY = node.y;

            const steps = 15; // Number of steps to move from one node to another
            let step = 0;

            const moveMario = () => {
              if (step <= steps) {
                const midwayY = startY + (endY - startY) / 2;
                if (step <= steps / 2) {
                  marioPosition.x = startX;
                  marioPosition.y = startY + (midwayY - startY) * (step / (steps / 2));
                  marioDirection = 'South';
                } else {
                  marioPosition.x = startX + (endX - startX) * ((step - steps / 2) / (steps / 2));
                  marioPosition.y = midwayY + (endY - midwayY) * ((step - steps / 2) / (steps / 2));
                  marioDirection = endX > startX ? 'East' : 'West';
                }
                step++;
                setTimeout(moveMario, 25); // Adjust the delay as needed
              } else {
                playTraversalSound();
                marioDirection = 'Done';
                index++;
                setTimeout(applyTraversal, 500); // Adjust the delay as needed
              }
            };

            moveMario();
          } else {
            index++;
            setTimeout(applyTraversal, 500); // Adjust the delay as needed
          }
        } else if (!traversalDonePlayed && traversalOrder.length) {
          playTraversalDoneSound();
          traversalDonePlayed = true;
        }
      };

      applyTraversal();
    };

    const generateTraversalOrder = (positions, traversal) => {
      // Find the root node (node without any parent)
      const root = positions[0];
      if (!root) return [];

      const order = [];
      const traverse = (node, type) => {
        if (!node) return;

        // Find children
        const leftChild = positions.find(
          (child) => child.id.startsWith(`${node.id}-L`)
        );
        const rightChild = positions.find(
          (child) => child.id.startsWith(`${node.id}-R`)
        );

        if (type === 'preOrder') order.push(node.id);
        traverse(leftChild, type);
        if (type === 'inOrder') order.push(node.id);
        traverse(rightChild, type);
        if (type === 'postOrder') order.push(node.id);
      };

      traverse(root, traversal);
      return order;
    };

    const draw = () => {
      // Clear the canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      // Draw background
      // context.fillStyle = "#55d500";
      // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      // Don't draw empty tree
      if (!positions || !positions.length || !tree?.root) return;

      // Draw edges (lines between nodes using elbows)
      positions.forEach((node) => {
        const { x, y, id } = node;

        // Find children
        const leftChild = positions.find(
          (child) => child.id.startsWith(`${id}-L`)
        );
        const rightChild = positions.find(
          (child) => child.id.startsWith(`${id}-R`)
        );

        // Draw elbows to children
        const elbowConfigs = [];
        if (leftChild) {
          elbowConfigs.push({
            type: 'branchLeft',
            start: { x, y },
            end: { x: leftChild.x, y: leftChild.y },
            cornerRadius: 15,
            color: "#ffffaa",
            linewidth: 10,
          });
        }

        if (rightChild) {
          elbowConfigs.push({
            type: 'branchRight',
            start: { x, y },
            end: { x: rightChild.x, y: rightChild.y },
            cornerRadius: 15,
            color: "#ffffaa",
            linewidth: 10,
          });
        }

        elbowConfigs.forEach((elbow) => {
          drawElbow(elbow);
        });
      });

      // Draw nodes (animated sprites)
      positions.forEach((node, index) => {
        const { x, y, value, applied } = node;

        // Select the appropriate image frames
        let img;
        if (index === 0) {
          img = rootImageFrames[0]; // Root node
        } else if (applied) {
          img = nodeImageFrames[1]; // Applied node
        } else {
          img = nodeImageFrames[currentFrame]; // Regular node
        }

        // Draw the sprite image
        context.imageSmoothingEnabled = false;
        context.drawImage(img, x - nodeSize / 2, y - nodeSize / 2, nodeSize, nodeSize);

        // Draw the value
        context.fillStyle = traversal === '' ? "white" : applied ? "white" : "#558000";
        context.font = "16px 'Press Start 2P'";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(value, x + (35), y);
      });


      if (backgroundElements.hill[0].complete && hillPositions.length) {
        // Draw random background elements
        hillPositions.forEach(pos => {
          context.drawImage(backgroundElements.hill[0], pos.x, pos.y, backgroundElementSize, backgroundElementSize);
        });
      };

      if (backgroundElements.hillSmall[0].complete && hillSmallPositions.length) {
        hillSmallPositions.forEach(pos => {
          context.drawImage(backgroundElements.hillSmall[0], pos.x, pos.y, backgroundElementSize, backgroundElementSize);
        });
      }

      if (backgroundElements.rock[0].complete && rockPositions.length) {
        rockPositions.forEach(pos => {
          context.drawImage(backgroundElements.rock[0], pos.x, pos.y, backgroundElementSize, backgroundElementSize);
        });
      }


      // Draw Mario sprite following the traversal
      const marioFrameSet = marioFrames[marioDirection];

      context.drawImage(
        marioDirection === 'Done' ? marioFrameSet[0] : marioFrameSet[marioFrameIndex],
        marioPosition.x - nodeSize / 2,
        marioPosition.y - nodeSize / 2,
        nodeSize,
        nodeSize
      );

      // Update Mario frame with delay
      marioFrameDelay++;
      if (marioFrameDelay >= marioFrameDelayThreshold) {
        marioFrameIndex = (marioFrameIndex + 1) % marioFrameSet.length;
        marioFrameDelay = 0;
      }

      // Update the current frame with delay
      frameDelay++;
      if (frameDelay >= frameDelayThreshold) {
        currentFrame = (currentFrame + 1) % frameCount;
        frameDelay = 0;
      }
    };

    // Elbow drawing function
    const drawElbow = (elbow) => {
      const { type, start, end, cornerRadius, color, linewidth } = elbow;

      context.beginPath();
      context.moveTo(start.x, start.y);

      const midwayY = start.y + yGap / 2; // Midway point based on yGap

      switch (type) {
        case "branchRight": // Down, then right midway, then down
          context.lineTo(start.x, midwayY - cornerRadius); // Go down to near midway
          context.quadraticCurveTo(
            start.x, midwayY, // Control point for curve
            start.x + cornerRadius, midwayY // Curve to midway right
          );
          context.lineTo(end.x - cornerRadius, midwayY); // Continue horizontally
          context.quadraticCurveTo(
            end.x, midwayY, // Control point for curve
            end.x, midwayY + cornerRadius // Curve down
          );
          context.lineTo(end.x, end.y); // Final down stroke
          break;

        case "branchLeft": // Down, then left midway, then down
          context.lineTo(start.x, midwayY - cornerRadius); // Go down to near midway
          context.quadraticCurveTo(
            start.x, midwayY, // Control point for curve
            start.x - cornerRadius, midwayY // Curve to midway left
          );
          context.lineTo(end.x + cornerRadius, midwayY); // Continue horizontally
          context.quadraticCurveTo(
            end.x, midwayY, // Control point for curve
            end.x, midwayY + cornerRadius // Curve down
          );
          context.lineTo(end.x, end.y); // Final down stroke
          break;
        case "topLeft":
          context.lineTo(start.x, end.y + cornerRadius);
          context.quadraticCurveTo(start.x, end.y, start.x + cornerRadius, end.y);
          break;
        case "topRight":
          context.lineTo(end.x - cornerRadius, start.y);
          context.quadraticCurveTo(end.x, start.y, end.x, start.y + cornerRadius);
          break;
        case "bottomLeft": // L shape
          context.lineTo(end.x + cornerRadius, start.y);
          context.quadraticCurveTo(end.x, start.y, end.x, start.y - cornerRadius);
          break;
        case "bottomRight": // flipped L shape
          context.lineTo(end.x - cornerRadius, start.y);
          context.quadraticCurveTo(end.x, start.y, end.x, start.y - cornerRadius);
          break;
        default:
          break;
      }

      context.lineTo(end.x, end.y);
      context.strokeStyle = color;
      context.lineWidth = linewidth;
      context.stroke();
    };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;

      if (positions && positions.length) {
        // Adjust canvas height dynamically
        const maxDepth = Math.max(...positions.map(pos => pos.y));
        canvas.height = maxDepth + yGap;
      };

      // Store the canvas height in the ref
      canvasHeightRef.current = canvas.height;

      // Initialize tree positions after canvas resize
      positions = initializeTree(tree, canvas);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    draw();

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
  }, [tree, traversal]);

  return (
    <div className='overflow-y-auto max-h-screen'>
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
}

export default BSTCanvas;