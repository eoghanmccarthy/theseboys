import React, { memo } from 'react';

import './styles.css';

const TrackSteps = memo(({ children, trackId }) => {
  return (
    <div id={`${trackId}-steps`} className={'track-steps'}>
      {children}
    </div>
  );
});

export default TrackSteps;
