import React, { memo } from 'react';
import classNames from 'classnames';

import './styles.css';

const PlaybackButton = memo(({ type = 'play', isActive = false, onClick }) => {
  return (
    <button
      className={classNames('playback-button', { [type]: type, active: isActive })}
      onClick={onClick}
    />
  );
});

export default PlaybackButton;
