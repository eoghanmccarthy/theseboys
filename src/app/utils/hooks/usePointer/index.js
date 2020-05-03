import React, { useEffect, useState } from 'react';

const usePointer = (element = document.body) => {
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const handleMouseDown = event => setIsDown(true);
    const handleMouseUp = event => setIsDown(false);

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
    };
  }, [element]);

  return { isDown };
};

export default usePointer;
