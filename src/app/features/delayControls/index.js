import React, { memo } from 'react';

import { fromPercent } from '../utils';

import { SliderControl } from '../controller';

const DelayControls = memo(({ trackId, delay }) => {
  if (!trackId || !delay) return null;

  return (
    <SliderControl
      id={`${trackId}-delay-wet`}
      label={'DEL'}
      step={1}
      max={100}
      initialValue={delay.get().wet}
      onChange={val => delay.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default DelayControls;
