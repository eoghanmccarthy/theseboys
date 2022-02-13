import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const ControllerGroup = memo(({ children, id, orientation = 'horizontal', ...rest }) => {
  return (
    <div id={id} className={cx('controller-group', { [orientation]: orientation })} {...rest}>
      {children}
    </div>
  );
});

export default ControllerGroup;
