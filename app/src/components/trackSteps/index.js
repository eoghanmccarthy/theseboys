import React, { memo } from 'react';
import { isArray, isString, isNumber } from 'utils/helpers/typeCheck';

import './styles.css';

import StepSequencer from '../stepSequencer';

const TrackSteps = memo(({ trackId, numSteps = 16, initialValue }) => {
  if (!isString(trackId) || !isNumber(numSteps) || !isArray(initialValue)) {
    return null;
  }

  return (
    <div id={`${trackId}-steps`} className={'track-steps'}>
      <StepSequencer trackId={trackId} numberOfSteps={numSteps} initialValue={initialValue} />
    </div>
  );
});

export default TrackSteps;
