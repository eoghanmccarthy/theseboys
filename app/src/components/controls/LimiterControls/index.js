import React, { memo } from 'react';

import { DECIBEL_MIN, DECIBEL_MAX } from '../../../utils/constants';
import { SliderControl } from '../../controllers';

const LimiterControls = memo(({ trackId, node }) => {
  if (!trackId || !node) return null;

  return (
    <SliderControl
      id={`${trackId}-limiter--threshold`}
      label={'LIM'}
      step={1}
      min={DECIBEL_MIN}
      max={DECIBEL_MAX}
      initialValue={node.get().threshold ?? 0}
      onChange={val => node.set({ threshold: val })}
    />
  );
});

export default LimiterControls;
