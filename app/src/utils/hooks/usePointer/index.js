import React, { useEffect, useState } from 'react';

const usePointer = (element = document.body) => {
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const handleMouseDown = () => setIsDown(true);
    const handleMouseUp = () => setIsDown(false);

    element.addEventListener('pointerdown', handleMouseDown);
    element.addEventListener('pointerup', handleMouseUp);

    return () => {
      element.removeEventListener('pointerdown', handleMouseDown);
      element.removeEventListener('pointerup', handleMouseUp);
    };
  }, [element]);

  return { isDown };
};

export default usePointer;
