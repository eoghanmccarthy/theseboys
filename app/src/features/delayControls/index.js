import React, { memo } from 'react';

import { fromPercent, toPercent } from '../utils';

import { SliderControl } from '../controller';

const DelayControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-delay--wet`}
      label={'DEL'}
      step={1}
      max={100}
      initialValue={toPercent([0, 1], effect.get().wet) ?? 0}
      onChange={val => effect.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default DelayControls;
