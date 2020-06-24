import React from 'react';
import classNames from 'classnames';

import './styles.css';

const PlayButton = ({ isPlaying = false, onClick }) => {
  return (
    <button className={classNames('play-button', { 'is-playing': isPlaying })} onClick={onClick} />
  );
};

export default PlayButton;
