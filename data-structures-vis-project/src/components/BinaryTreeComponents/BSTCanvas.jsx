/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';

const BSTCanvas = ({ tree }) => {
  const canvasRef = useRef(null);
  const nodeSize = 30;
  const canvasHeightRef = useRef(0);

  useEffect(() => {

    const xScale = 0.75;
    const yGap = 100;


    const initializeTree = (tree, canvas) => {
      if (!tree?.root) return null;

      const positions = [];
      const canvasWidth = canvas.width;

      const assignPositions = (node, depth, xStart, xEnd, path = '') => {
        if (!node) return;

        const x = (xStart + xEnd) / 2 * xScale + (1 - xScale) * canvasWidth / 2;
        const y = depth * yGap + nodeSize + 50;
        const id = path + (path ? '-' : '') + node.value;

        positions.push({ id, value: node.value, x, y });

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

    const update = () => {
      console.log('update');
    };

    const draw = () => {
      // Clear the canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      // Don't draw empty tree
      if (!positions || !positions.length || !tree?.root) return;

      // Draw edges (lines between nodes using elbows)
      positions.forEach((node) => {
        const { x, y, id } = node;

        // Find children
        const leftChild = positions.find(
          (child) => {
            return child.id.startsWith(`${id}-L`);
          }
        );
        const rightChild = positions.find(
          (child) => child.id.startsWith(`${id}-R`)
        );

        // console.log(`Node ${id}: leftChild=${leftChild?.id}, rightChild=${rightChild?.id}`);

        // Draw elbows to children
        const elbowConfigs = [];
        if (leftChild) {
          elbowConfigs.push({
            type: 'branchLeft',
            start: { x, y },
            end: { x: leftChild.x, y: leftChild.y },
            cornerRadius: 10,
            color: "white",
            linewidth: 4,
          });
        }

        if (rightChild) {
          elbowConfigs.push({
            type: 'branchRight',
            start: { x, y },
            end: { x: rightChild.x, y: rightChild.y },
            cornerRadius: 10,
            color: "white",
            linewidth: 4,
          });
        }

        elbowConfigs.forEach((elbow) => {
          drawElbow(elbow);
        });
      });

      // Draw nodes (circles)
      positions.forEach((node) => {
        const { x, y, value } = node;

        // Draw the circle
        context.fillStyle = "white";
        context.beginPath();
        context.arc(x, y, nodeSize / 2, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "black";
        context.stroke();

        // Draw the value
        context.fillStyle = "black";
        context.font = "16px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(value, x, y);
      });
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
      // console.log("Tree initialized with positions:", positions);
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
        // update();
        draw();
      }
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [tree]);

  return (
    <div className='overflow-y-auto max-h-screen'>
      <canvas ref={canvasRef} className="w-full"></canvas>
    </div>
  );
}

export default BSTCanvas;