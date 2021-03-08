import React, { memo } from 'react';

import './styles.css';

import { Steps } from '../../stepSequencer';

const TrackSteps = memo(({ trackId, numSteps = 16, initialValue }) => {
  return (
    <div id={`${trackId}-steps`} className={'track-steps'}>
      <Steps trackId={trackId} numberOfSteps={numSteps} initialValue={initialValue} />
    </div>
  );
});

export default TrackSteps;
