import React, { memo } from 'react';

import { fromPercent } from '../utils';
import { EQ3_MIN, EQ3_MAX } from '../utils/constants';

import { SliderControl } from '../controller';

const Eq3Controls = memo(({ trackId, eq3 }) => {
  if (!trackId || !eq3) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-eq3-low`}
        label={'LOW'}
        step={1}
        max={100}
        initialValue={eq3.get().low}
        onChange={val => eq3.set({ low: fromPercent([EQ3_MIN, EQ3_MAX], val) })}
      />
      <SliderControl
        id={`${trackId}-eq3-mid`}
        label={'MID'}
        step={1}
        max={100}
        initialValue={eq3.get().mid}
        onChange={val => eq3.set({ mid: fromPercent([EQ3_MIN, EQ3_MAX], val) })}
      />
      <SliderControl
        id={`${trackId}-eq3-high`}
        label={'HIG'}
        step={1}
        max={100}
        initialValue={eq3.get().high}
        onChange={val => eq3.set({ high: fromPercent([EQ3_MIN, EQ3_MAX], val) })}
      />
    </>
  );
});

export default Eq3Controls;
