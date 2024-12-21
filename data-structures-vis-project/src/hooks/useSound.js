// hooks/useSound.js

import { useState } from 'react';

const useSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (soundUrl) => {
    const audio = new Audio(soundUrl);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  return { isPlaying, playSound };
};

export default useSound;
