import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

import { Steps } from '../stepSequencer';

const TrackSteps = memo(({ trackId, numSteps = 16, defaultValue }) => {
  const store = useSelector(state => state.app);
  const [initialValue] = useState(store?.tracks?.[trackId]?.steps || defaultValue);

  return (
    <div id={`${trackId}-steps`} className={'track-steps'}>
      <Steps trackId={trackId} numberOfSteps={numSteps} initialValue={initialValue} />
    </div>
  );
});

export default TrackSteps;
