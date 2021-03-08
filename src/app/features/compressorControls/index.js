import React, { memo } from 'react';

import { SliderControl } from '../controller';

const CompressorControls = memo(({ trackId, compressor, initialValue = {} }) => {
  if (!trackId || !compressor) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-compressor-ratio`}
        label={'RAT'}
        step={1}
        min={1}
        max={20}
        initialValue={initialValue.ratio}
        onChange={val => compressor.set({ ratio: val })}
      />
      <SliderControl
        id={`${trackId}-compressor-attack`}
        label={'ATK'}
        step={0.001}
        toFixed={3}
        initialValue={initialValue.attack}
        onChange={val => compressor.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-compressor-release`}
        label={'REL'}
        step={0.001}
        toFixed={3}
        initialValue={initialValue.release}
        onChange={val => compressor.set({ release: val })}
      />
    </>
  );
});

export default CompressorControls;
