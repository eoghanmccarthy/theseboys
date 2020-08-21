import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const ControlGroup = memo(({ children, orientation = 'vertical', title = '' }) => {
  return (
    <div className={cx('control-group', { [orientation]: orientation })}>
      <div className={'control-group__controls'}>{children}</div>
      {title ? (
        <div className={'control-group__label'}>
          <div />
          <span>{title}</span>
          <div />
        </div>
      ) : null}
    </div>
  );
});

export default ControlGroup;
