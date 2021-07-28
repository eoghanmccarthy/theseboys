import React, { memo } from 'react';

import { SliderControl } from '../controller';

const CompressorControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-compressor-ratio`}
        label={'RAT'}
        step={1}
        min={1}
        max={20}
        initialValue={effect.get().ratio ?? 1}
        onChange={val => effect.set({ ratio: val })}
      />
      <SliderControl
        id={`${trackId}-compressor-attack`}
        label={'ATK'}
        step={0.001}
        toFixed={3}
        initialValue={effect.get().attack ?? 0}
        onChange={val => effect.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-compressor-release`}
        label={'REL'}
        step={0.001}
        toFixed={3}
        initialValue={effect.get().release ?? 0}
        onChange={val => effect.set({ release: val })}
      />
    </>
  );
});

export default CompressorControls;
