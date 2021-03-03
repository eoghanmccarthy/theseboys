import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const EffectsGroup = memo(({ children, orientation = 'vertical', title = '' }) => {
  return (
    <div className={cx('EffectsGroup', { [orientation]: orientation })}>
      <div className={'EffectsGroup__controls'}>{children}</div>
      {title ? (
        <div className={'EffectsGroup__label'}>
          <div />
          <span>{title}</span>
          <div />
        </div>
      ) : null}
    </div>
  );
});

export default EffectsGroup;
