import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const TrackEffects = memo(({ children, trackId }) => {
  return (
    <div id={`${trackId}-effects`} className={cx(`TrackEffects`)}>
      {children}
    </div>
  );
});

export default TrackEffects;
