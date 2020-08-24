import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const ToggleControlsButton = memo(({ trackId }) => {
  return (
    <button
      className={cx('toggle-controls-button', { [trackId]: trackId })}
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
    </button>
  );
});

export default ToggleControlsButton;
