import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const ButtonGroup = memo(({ children, orientation = 'horizontal' }) => {
  return <div className={cx('button-group', { [orientation]: orientation })}>{children}</div>;
});

export default ButtonGroup;
