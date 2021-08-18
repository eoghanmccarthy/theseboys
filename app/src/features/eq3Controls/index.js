import React, { memo } from 'react';

import { DECIBEL_MIN, DECIBEL_MAX, FREQUENCY_MIN, FREQUENCY_MAX } from '../utils/constants';

import { SliderControl } from '../controller';

const Eq3Controls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-eq3--low`}
        label={'LOW'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={effect.get().low ?? 0}
        onChange={val => effect.set({ low: val })}
      />
      <SliderControl
        id={`${trackId}-eq3--mid`}
        label={'MID'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={effect.get().mid ?? 0}
        onChange={val => effect.set({ mid: val })}
      />
      <SliderControl
        id={`${trackId}-eq3--high`}
        label={'HIG'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={effect.get().high ?? 0}
        onChange={val => effect.set({ high: val })}
      />
      <SliderControl
        id={`${trackId}-eq3--low-frequency`}
        label={'LBP'}
        step={1}
        min={FREQUENCY_MIN}
        max={FREQUENCY_MAX}
        initialValue={effect.get().lowFrequency ?? 0}
        onChange={val => effect.set({ lowFrequency: val })}
      />
      <SliderControl
        id={`${trackId}-eq3--high-frequency`}
        label={'HBP'}
        step={1}
        min={FREQUENCY_MIN}
        max={FREQUENCY_MAX}
        initialValue={effect.get().highFrequency ?? 0}
        onChange={val => effect.set({ highFrequency: val })}
      />
    </>
  );
});

export default Eq3Controls;
