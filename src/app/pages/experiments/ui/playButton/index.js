import React from 'react';

import './styles.css';

const PlayButton = ({ onClick }) => {
  return <button onClick={onClick} className={'play-button'} />;
};

export default PlayButton;
