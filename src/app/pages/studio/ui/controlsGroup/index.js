import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const ControlsGroup = memo(({ children, orientation = 'vertical' }) => {
  return <div className={cx('controls-group', { [orientation]: orientation })}>{children}</div>;
});

export default ControlsGroup;
