import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import Button from 'componentLib/Button';

const HitButton = memo(({ trackId, onClick }) => {
  return (
    <Button className={cx(`hit-button`, `${trackId}`)} onClick={onClick}>
      hit
    </Button>
  );
});

export default HitButton;
