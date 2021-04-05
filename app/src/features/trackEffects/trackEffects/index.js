import React, { memo } from 'react';

import './styles.css';

const TrackEffects = memo(({ children, trackId }) => {
  return (
    <div id={`${trackId}-effects`} className={'track-effects'}>
      {children}
    </div>
  );
});

export default TrackEffects;
