// utils/playSound.js

export const playSound = (soundUrl) => {
  const audio = new Audio(soundUrl);
  audio.play();
};