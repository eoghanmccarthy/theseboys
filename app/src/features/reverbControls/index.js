import React, { memo } from 'react';

import { fromPercent, toPercent } from '../utils';

import { SliderControl } from '../controller';

const ReverbControls = memo(({ trackId, reverb }) => {
  if (!trackId || !reverb) return null;

  return (
    <SliderControl
      id={`${trackId}-reverb-wet`}
      label={'WET'}
      step={1}
      max={100}
      initialValue={toPercent([0, 1], reverb.get().wet) ?? 0}
      onChange={val => reverb.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default ReverbControls;
