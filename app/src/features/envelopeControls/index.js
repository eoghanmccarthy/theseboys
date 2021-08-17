import React, { memo } from 'react';

import { SliderControl } from '../controller';

const EnvelopeControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-envelope--attack`}
        label={'ATK'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={effect.get().attack ?? 0}
        onChange={val => effect.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--decay`}
        label={'DEC'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={effect.get().decay ?? 0}
        onChange={val => effect.set({ decay: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--sustain`}
        label={'SUS'}
        step={0.001}
        toFixed={3}
        initialValue={effect.get().sustain ?? 0}
        onChange={val => effect.set({ sustain: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--release`}
        label={'REL'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={effect.get().release ?? 0}
        onChange={val => effect.set({ release: val })}
      />
    </>
  );
});

export default EnvelopeControls;
