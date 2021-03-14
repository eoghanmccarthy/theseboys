import React, { memo } from 'react';

import { SliderControl } from '../controller';

const EnvelopeControls = memo(({ trackId, envelope }) => {
  if (!trackId || !envelope) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-envelope-attack`}
        label={'ATK'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={envelope.get().attack ?? 0}
        onChange={val => envelope.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-envelope-decay`}
        label={'DEC'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={envelope.get().decay ?? 0}
        onChange={val => envelope.set({ decay: val })}
      />
      <SliderControl
        id={`${trackId}-envelope-sustain`}
        label={'SUS'}
        step={0.001}
        toFixed={3}
        initialValue={envelope.get().sustain ?? 0}
        onChange={val => envelope.set({ sustain: val })}
      />
      <SliderControl
        id={`${trackId}-envelope-release`}
        label={'REL'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={envelope.get().release ?? 0}
        onChange={val => envelope.set({ release: val })}
      />
    </>
  );
});

export default EnvelopeControls;
