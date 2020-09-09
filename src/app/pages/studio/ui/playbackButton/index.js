import React, { memo } from 'react';
import classNames from 'classnames';

import './styles.css';

import Button from 'componentLib/Button';

const PlaybackButton = memo(({ type = 'play', isActive = false, onClick }) => {
  return (
    <Button
      className={classNames('playback-button', { [type]: type, active: isActive })}
      onClick={onClick}
    />
  );
});

export default PlaybackButton;
