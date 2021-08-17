import React, { memo } from 'react';

import { DECIBEL_MIN, DECIBEL_MAX } from '../utils/constants';

import { SliderControl } from '../controller';

const LimiterControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-limiter--threshold`}
      label={'LIM'}
      step={1}
      min={DECIBEL_MIN}
      max={DECIBEL_MAX}
      initialValue={effect.get().threshold ?? 0}
      onChange={val => effect.set({ threshold: val })}
    />
  );
});

export default LimiterControls;
