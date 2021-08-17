import React, { memo } from 'react';

import { fromPercent, toPercent } from '../utils';

import { SliderControl } from '../controller';

const DistortionControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-distortion--wet`}
      label={'DIS'}
      step={1}
      max={100}
      initialValue={toPercent([0, 1], effect.get().wet) ?? 0}
      onChange={val => effect.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default DistortionControls;
