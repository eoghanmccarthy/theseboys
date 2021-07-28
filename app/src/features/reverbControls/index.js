import React, { memo } from 'react';

import { fromPercent, toPercent } from '../utils';

import { SliderControl } from '../controller';

const ReverbControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-reverb-wet`}
      label={'REV'}
      step={1}
      max={100}
      initialValue={toPercent([0, 1], effect.get().wet) ?? 0}
      onChange={val => effect.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default ReverbControls;
