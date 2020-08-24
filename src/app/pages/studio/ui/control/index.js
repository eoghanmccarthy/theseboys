import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const Control = memo(({ children, type, controlName, orientation = 'vertical', label }) => {
  return (
    <div className={cx('ui-control', { [type]: type, [orientation]: orientation })}>
      <span className={`ui-control__label`}>{label}</span>
      <div className={'ui-control__controls'}>{children}</div>
      <span className={`ui-control__value ${controlName}`} />
    </div>
  );
});

export default Control;
