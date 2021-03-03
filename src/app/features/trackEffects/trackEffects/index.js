import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const TrackEffects = memo(({ children, trackId }) => {
  return <div className={cx(`TrackEffects ${trackId}`)}>{children}</div>;
});

export default TrackEffects;
