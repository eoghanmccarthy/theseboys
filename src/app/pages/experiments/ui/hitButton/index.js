import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const HitButton = memo(({ sequencerName, onClick }) => {
  return (
    <button className={cx(`hit-button ${sequencerName}__hit`)} onClick={onClick}>
      hit
    </button>
  );
});

export default HitButton;
