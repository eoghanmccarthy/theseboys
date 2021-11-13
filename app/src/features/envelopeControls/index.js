import React, { memo } from 'react';

import { SliderControl } from '../controller';

const EnvelopeControls = memo(({ trackId, node }) => {
  if (!trackId || !node) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-envelope--attack`}
        label={'ATK'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={node.get().attack ?? 0}
        onChange={val => node.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--decay`}
        label={'DEC'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={node.get().decay ?? 0}
        onChange={val => node.set({ decay: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--sustain`}
        label={'SUS'}
        step={0.001}
        toFixed={3}
        initialValue={node.get().sustain ?? 0}
        onChange={val => node.set({ sustain: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--release`}
        label={'REL'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={node.get().release ?? 0}
        onChange={val => node.set({ release: val })}
      />
    </>
  );
});

export default EnvelopeControls;
