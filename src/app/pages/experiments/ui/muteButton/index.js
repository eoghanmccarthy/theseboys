import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const MuteButton = memo(({ node, sequencerName }) => {
  if (!node) return null;

  return (
    <button
      className={cx(`mute-button ${sequencerName}__mute`)}
      onClick={() => {
        const { mute } = node.get();
        node.set({ mute: !mute });

        const element = document.querySelector(`.${sequencerName}__mute`);

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
