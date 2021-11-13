import React, { memo } from 'react';

import { SliderControl } from '../controller';

const PitchShiftControls = memo(({ trackId, node }) => {
  if (!trackId || !node) return null;

  return (
    <SliderControl
      id={`${trackId}-pitchshift--pitch`}
      label={'PCH'}
      step={12}
      min={-48}
      max={48}
      initialValue={node.get().pitch ?? 0}
      onChange={val => node.set({ pitch: val })}
    />
  );
});

export default PitchShiftControls;
