// hooks/useSound.js

import { useState } from 'react';

const useSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (soundUrl, { volume = 1.0, loop = false } = {}) => {
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.loop = loop;
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
    return audio;
  };

  const stopSound = (audio) => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }

  return { isPlaying, playSound, stopSound };
};

export default useSound;
