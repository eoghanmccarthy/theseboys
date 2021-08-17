import React, { memo } from 'react';

import { DECIBEL_MIN, DECIBEL_MAX } from '../utils/constants';

import { SliderControl } from '../controller';

const CompressorControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-compressor--ratio`}
        label={'RTO'}
        step={1}
        min={1}
        max={20}
        initialValue={effect.get().ratio ?? 1}
        onChange={val => effect.set({ ratio: val })}
      />
      <SliderControl
        id={`${trackId}-compressor--attack`}
        label={'ATK'}
        step={0.001}
        toFixed={3}
        initialValue={effect.get().attack ?? 0}
        onChange={val => effect.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-compressor--release`}
        label={'REL'}
        step={0.001}
        toFixed={3}
        initialValue={effect.get().release ?? 0}
        onChange={val => effect.set({ release: val })}
      />
      <SliderControl
        id={`${trackId}-compressor--threshold`}
        label={'TRH'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={effect.get().threshold ?? 0}
        onChange={val => effect.set({ threshold: val })}
      />
    </>
  );
});

export default CompressorControls;
