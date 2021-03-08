import React, { memo } from 'react';

import { fromPercent } from '../utils';

import { SliderControl } from '../controller';

const DistortionControls = memo(({ trackId, distortion, initialValue = {} }) => {
  if (!trackId || !distortion) return null;

  return (
    <SliderControl
      id={`${trackId}-distortion-wet`}
      label={'DIS'}
      step={1}
      max={100}
      initialValue={initialValue?.wet}
      onChange={val => distortion.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default DistortionControls;
