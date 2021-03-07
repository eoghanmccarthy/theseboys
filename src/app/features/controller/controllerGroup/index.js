import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const ControllerGroup = memo(({ children, orientation = 'horizontal' }) => {
  return <div className={cx('controller-group', { [orientation]: orientation })}>{children}</div>;
});

export default ControllerGroup;
