import React, { memo } from 'react';

import { fromPercent } from '../utils';

import { SliderControl } from '../controller';

const ReverbControls = memo(({ trackId, reverb, initialValue = {} }) => {
  if (!trackId || !reverb) return null;

  return (
    <SliderControl
      id={`${trackId}-reverb-wet`}
      label={'REV'}
      step={1}
      max={100}
      initialValue={initialValue?.wet}
      onChange={val => reverb.set({ wet: fromPercent([0, 1], val) })}
    />
  );
});

export default ReverbControls;
