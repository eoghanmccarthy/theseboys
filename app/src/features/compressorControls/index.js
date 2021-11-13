import React, { memo } from 'react';

import { DECIBEL_MIN, DECIBEL_MAX } from '../utils/constants';

import { SliderControl } from '../controller';

const CompressorControls = memo(({ trackId, node }) => {
  if (!trackId || !node) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-compressor--ratio`}
        label={'RTO'}
        step={1}
        min={1}
        max={20}
        initialValue={node.get().ratio ?? 1}
        onChange={val => node.set({ ratio: val })}
      />
      <SliderControl
        id={`${trackId}-compressor--attack`}
        label={'ATK'}
        step={0.001}
        toFixed={3}
        initialValue={node.get().attack ?? 0}
        onChange={val => node.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-compressor--release`}
        label={'REL'}
        step={0.001}
        toFixed={3}
        initialValue={node.get().release ?? 0}
        onChange={val => node.set({ release: val })}
      />
      <SliderControl
        id={`${trackId}-compressor--threshold`}
        label={'TRH'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={node.get().threshold ?? 0}
        onChange={val => node.set({ threshold: val })}
      />
    </>
  );
});

export default CompressorControls;
