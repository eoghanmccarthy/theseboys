import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const MuteButton = memo(({ node, trackId }) => {
  if (!node) return null;

  return (
    <button
      className={cx(`mute-button ${trackId}__mute`)}
      onClick={() => {
        const { mute } = node.get();
        node.set({ mute: !mute });

        const element = document.querySelector(`.${trackId}__mute`);

        if (!mute) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      }}
    >
      mute
    </button>
  );
});

export default MuteButton;
