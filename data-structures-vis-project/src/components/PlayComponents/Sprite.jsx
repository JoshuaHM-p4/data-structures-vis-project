import React, { useEffect, useRef } from 'react';

const Sprite = ({ imageSrc, x, y, width, height, animation }) => {
  const spriteRef = useRef(null);

  useEffect(() => {
    const sprite = spriteRef.current;
    sprite.style.backgroundImage = `url(${imageSrc})`;
    sprite.style.width = `${width}px`;
    sprite.style.height = `${height}px`;
    sprite.style.backgroundPosition = `${x}px ${y}px`;
    sprite.style.animation = animation;
  }, [imageSrc, x, y, width, height, animation]);

  return <div ref={spriteRef} className="sprite"></div>;
}

export default Sprite;