import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import Button from 'componentLib/Button';

const MuteButton = memo(({ node, trackId }) => {
  if (!node) return null;

  return (
    <Button
      className={cx(`mute-button`, `${trackId}`)}
      onClick={() => {
        const { mute } = node.get();
        node.set({ mute: !mute });

        const element = document.querySelector(`.mute-button.${trackId}`);

        if (!mute) {
          element.classList.add('active');
        } else {
          element.classList.remove('active');
        }
      }}
    >
      mute
    </Button>
  );
});

export default MuteButton;
