import React, { memo } from 'react';

import { fromPercent, toPercent } from '../utils';
import { EQ3_MIN, EQ3_MAX } from '../utils/constants';

import { SliderControl } from '../controller';

const Eq3Controls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-eq3-low`}
        label={'LOW'}
        step={1}
        max={100}
        initialValue={toPercent([EQ3_MIN, EQ3_MAX], effect.get().low) ?? 0}
        onChange={val => effect.set({ low: fromPercent([EQ3_MIN, EQ3_MAX], val) })}
      />
      <SliderControl
        id={`${trackId}-eq3-mid`}
        label={'MID'}
        step={1}
        max={100}
        initialValue={toPercent([EQ3_MIN, EQ3_MAX], effect.get().mid) ?? 0}
        onChange={val => effect.set({ mid: fromPercent([EQ3_MIN, EQ3_MAX], val) })}
      />
      <SliderControl
        id={`${trackId}-eq3-high`}
        label={'HIG'}
        step={1}
        max={100}
        initialValue={toPercent([EQ3_MIN, EQ3_MAX], effect.get().high) ?? 0}
        onChange={val => effect.set({ high: fromPercent([EQ3_MIN, EQ3_MAX], val) })}
      />
    </>
  );
});

export default Eq3Controls;
