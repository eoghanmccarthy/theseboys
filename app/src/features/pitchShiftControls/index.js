import React, { memo } from 'react';

import { SliderControl } from '../controller';

const PitchShiftControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-pitchshift-wet`}
      label={'PIT'}
      step={12}
      min={-48}
      max={48}
      initialValue={effect.get().pitch ?? 0}
      onChange={val => effect.set({ pitch: val })}
    />
  );
});

export default PitchShiftControls;
