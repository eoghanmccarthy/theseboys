import React from 'react';

import './styles.css';

const PlayButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={'play-button'}>
      {children}
    </button>
  );
};

export default PlayButton;
