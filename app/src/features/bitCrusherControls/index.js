import React, { memo } from 'react';

import { SliderControl } from '../controller';

const BitCrusherControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-bitcrusher-bits`}
      label={'BTC'}
      step={1}
      min={1}
      max={16}
      initialValue={effect.get().bits ?? 0}
      onChange={val => effect.set({ bits: val })}
    />
  );
});

export default BitCrusherControls;
