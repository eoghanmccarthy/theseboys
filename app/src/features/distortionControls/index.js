import React, { memo } from 'react';

import { fromPercent, toPercent } from '../utils';

import { SliderControl } from '../controller';

const DistortionControls = memo(({ trackId, distortion }) => {
  if (!trackId || !distortion) return null;

  return (
    <SliderControl
      id={`${trackId}-distortion-wet`}
      label={'DIS'}
      step={1}
      max={100}
      initialValue={toPercent([0, 1], distortion.get().wet) ?? 0}
      onChange={val => distortion.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default DistortionControls;
