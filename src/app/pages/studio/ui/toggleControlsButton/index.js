import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import Button from 'componentLib/button';

const ToggleControlsButton = memo(({ trackId }) => {
  return (
    <Button
      className={cx('toggle-controls-button', `${trackId}`)}
      data-status={'expanded'}
      onClick={() => {
        const elem = document.querySelector(`.track__controls.${trackId}`);
        const display = elem.style.display;

        if (display !== 'none') {
          elem.style.display = 'none';
          document
            .querySelector(`.toggle-controls-button.${trackId}`)
            .setAttribute('data-status', 'collapsed');
        } else {
          elem.style.display = 'flex';
          document
            .querySelector(`.toggle-controls-button.${trackId}`)
            .setAttribute('data-status', 'expanded');
        }
      }}
    >
      <span />
      <span />
    </Button>
  );
});

export default ToggleControlsButton;
