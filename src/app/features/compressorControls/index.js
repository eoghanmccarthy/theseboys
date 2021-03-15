import React, { memo } from 'react';

import { SliderControl } from '../controller';

const CompressorControls = memo(({ trackId, compressor }) => {
  if (!trackId || !compressor) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-compressor-ratio`}
        label={'RAT'}
        step={1}
        min={1}
        max={20}
        initialValue={compressor.get().ratio ?? 1}
        onChange={val => compressor.set({ ratio: val })}
      />
      <SliderControl
        id={`${trackId}-compressor-attack`}
        label={'ATK'}
        step={0.001}
        toFixed={3}
        initialValue={compressor.get().attack ?? 0}
        onChange={val => compressor.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-compressor-release`}
        label={'REL'}
        step={0.001}
        toFixed={3}
        initialValue={compressor.get().release ?? 0}
        onChange={val => compressor.set({ release: val })}
      />
    </>
  );
});

export default CompressorControls;
