import React, { memo } from 'react';

import './styles.css';

const EffectsGroup = memo(({ style = {}, children, span, title = '' }) => {
  return (
    <div style={{ gridColumn: span, ...style }} className={'effects-group'}>
      <div className={'controls'}>{children}</div>
      {title ? (
        <div className={'label'}>
          <div />
          <span>{title}</span>
          <div />
        </div>
      ) : null}
    </div>
  );
});

export default EffectsGroup;
