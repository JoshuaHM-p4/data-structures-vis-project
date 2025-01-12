import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const MarioAnimation = ({ pipes, onComplete }) => {
  const marioRef = useRef();
  const flagRef = useRef();
  const [marioState, setMarioState] = useState('idle'); // 'idle' or 'jump'
  const [animationCompleted, setAnimationCompleted] = useState(false); // Track animation completion

  useEffect(() => {
    if (pipes.length > 1 && !animationCompleted) {
      const tl = gsap.timeline({
        onComplete: () => {
          setMarioState('idle');
          setAnimationCompleted(true); // Mark animation as completed
          if (onComplete) onComplete();
        },
      });

      pipes.forEach((pipe, index) => {
        if (index < pipes.length - 1) {
          const nextPipe = pipes[index + 1];
          // Move mario to the next pipe
          tl.to(marioRef.current, {
            x: pipe.x,
            y: -pipe.height, // Adjust y position to ensure correct jumping
            duration: 0.3,
            ease: 'power1.inOut',
            motionPath: {
              path: [
                { x: pipe.x, y: -pipe.height - 5 },
                { x: (pipe.x + nextPipe.x) / 2, y: -pipe.height - 50 }, // Peak of the jump
                { x: nextPipe.x, y: -nextPipe.height - 15 },
              ],
              curviness: 1,
            },
            onStart: () => setMarioState('jump'),
            onUpdate: () => {
              if (marioRef.current) {
                const rect = marioRef.current.getBoundingClientRect();
                // console.log(`Mario's position - x: ${rect.left}, y: ${rect.top}`);
              }
            },
            onComplete: () => setMarioState('idle'),
          });
        }
      });

      // Add final jump to the flagpole
      const lastPipe = pipes[pipes.length - 1];
      const flagPoleBase = 20;
      const flagPoleX = lastPipe.x + 100; // Adjust the x position of the flagpole as needed
      const flagPoleY = -lastPipe.height - 100; // Adjust the y position of the flagpole as needed

      tl.to(marioRef.current, {
        x: flagPoleX,
        y: flagPoleY,
        duration: 0.3,
        ease: 'power1.inOut',
        onStart: () => setMarioState('jump'),
        onUpdate: () => {
          if (marioRef.current) {
            const rect = marioRef.current.getBoundingClientRect();
            // console.log(`Mario's position - x: ${rect.left}, y: ${rect.top}`);
          }
        },
        onComplete: () => setMarioState('pole'),
      }).to(marioRef.current, {
        y: -20,
        duration: 1,
        ease: 'power1.out',
        onStart: () => setMarioState('pole'),
        onUpdate: () => {
          if (marioRef.current) {
            const rect = marioRef.current.getBoundingClientRect();
            // console.log(`Mario's position - x: ${rect.left}, y: ${rect.top}`);
          }
        },
        onComplete: () => setMarioState('idle'),
      });

      // Add flag falling animation after Mario starts falling
      tl.to(flagRef.current, {
        bottom: flagPoleBase + 32, // Adjust this to make the flag fall along with Mario
        duration: 1,
        ease: 'power1.out',
        onStart: () => {
          console.log('Flag is falling');
        },
        onUpdate: () => {
          if (flagRef.current) {
            const rect = flagRef.current.getBoundingClientRect();
            // console.log(`Flag position - x: ${rect.left}, y: ${rect.top}`);
          }
        },
      });
    }
  }, [pipes, animationCompleted]);

  useEffect(() => {
    const logPosition = () => {
      if (marioRef.current) {
        const rect = marioRef.current.getBoundingClientRect();
        // console.log(`Mario's position - x: ${rect.left}, y: ${rect.top}`);
      }
    };

    const intervalId = setInterval(logPosition, 1000); // Log position every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <div
        ref={marioRef}
        style={{
          position: 'fixed',
          bottom: '0px',
          left: '0px',
          width: '25px',
          height: '25px',
          zIndex: '10',
          backgroundImage: `url('/mario/${marioState}.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'contain',
          transition: 'background 0.3s',
          imageRendering: 'pixelated', // Disable anti-aliasing
        }}
      />

      {/* Flag */}
      <img
        className="fixed border h-[32px] w-[32px] z-10 border-red-600 pixelated"
        src="/flag/flag.png"
        ref={flagRef}
        style={{
          bottom: `${320 - 25}px`,
          left: `${pipes[pipes.length - 1].x + 100 - 18}px`,
        }}
      />

      {/*  Pole */}
      <img className={`fixed bottom-[20px] border h-[320px] border-red-600 pixelated`} src="/flag/pole.png"
      style={{
        left: `${pipes[pipes.length - 1].x + 100}px`,
      }}/>

    </>
  );
};

export default MarioAnimation;
