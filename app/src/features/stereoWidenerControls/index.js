import React, { memo } from 'react';

import { SliderControl } from '../controller';

const StereoWidenerControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-stereowidener-width`}
      label={'STW'}
      initialValue={effect.get().width ?? 0}
      onChange={val => effect.set({ width: val })}
    />
  );
});

export default StereoWidenerControls;
