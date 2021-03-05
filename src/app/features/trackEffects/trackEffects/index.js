import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const TrackEffects = memo(({ children }) => {
  return <div className={cx(`TrackEffects`)}>{children}</div>;
});

export default TrackEffects;
