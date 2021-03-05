import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const EffectsGroup = memo(({ style = {}, children, span, title = '' }) => {
  return (
    <div style={{ gridColumn: span, ...style }} className={cx('EffectsGroup')}>
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
