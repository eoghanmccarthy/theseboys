import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const HitButton = memo(({ trackId, onClick }) => {
  return (
    <button className={cx(`hit-button ${trackId}__hit`)} onClick={onClick}>
      hit
    </button>
  );
});

export default HitButton;
