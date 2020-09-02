import React, { useState } from 'react';

const useDialog = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  return {
    isOpen: isOpen,
    open: v => setIsOpen(true),
    close: v => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev)
  };
};

export default useDialog;
