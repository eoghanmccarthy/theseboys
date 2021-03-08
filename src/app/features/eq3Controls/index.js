import React, { memo } from 'react';

import { fromPercent } from '../utils';

import { SliderControl } from '../controller';

const EQ3_MIN = -60;
const EQ3_MAX = 20;

const Eq3Controls = memo(({ trackId, eq3, initialValue = {} }) => {
  if (!trackId || !eq3) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-eq3-low`}
        label={'LOW'}
        step={1}
        min={0}
        max={100}
        initialValue={initialValue.low.toFixed(0)}
        onChange={val => eq3.set({ low: fromPercent([EQ3_MIN, EQ3_MAX], val, 0) })}
      />
      <SliderControl
        id={`${trackId}-eq3-mid`}
        label={'MID'}
        step={1}
        min={0}
        max={100}
        initialValue={initialValue.mid.toFixed(0)}
        onChange={val => eq3.set({ mid: fromPercent([EQ3_MIN, EQ3_MAX], val, 0) })}
      />
      <SliderControl
        id={`${trackId}-eq3-high`}
        label={'HIG'}
        step={1}
        min={0}
        max={100}
        initialValue={initialValue.high.toFixed(0)}
        onChange={val => eq3.set({ high: fromPercent([EQ3_MIN, EQ3_MAX], val, 0) })}
      />
    </>
  );
});

export default Eq3Controls;
