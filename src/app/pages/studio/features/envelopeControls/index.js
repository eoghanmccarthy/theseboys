import React, { memo } from 'react';

import { SliderControl } from 'features/controller';

const EnvelopeControls = memo(({ trackId, envelope, defaultValues = {} }) => {
  if (!trackId || !envelope) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-envelope-attack`}
        label={'ATK'}
        step={0.001}
        max={2}
        initialValue={defaultValues.attack.toFixed(3)}
        onChange={val => envelope.set({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-envelope-decay`}
        label={'DEC'}
        step={0.001}
        max={2}
        initialValue={defaultValues.decay.toFixed(3)}
        onChange={val => envelope.set({ decay: val })}
      />
      <SliderControl
        id={`${trackId}-envelope-sustain`}
        label={'SUS'}
        step={0.001}
        max={2}
        initialValue={defaultValues.sustain.toFixed(3)}
        onChange={val => envelope.set({ sustain: val })}
      />
      <SliderControl
        id={`${trackId}-envelope-release`}
        label={'REL'}
        step={0.001}
        max={2}
        initialValue={defaultValues.release.toFixed(3)}
        onChange={val => envelope.set({ release: val })}
      />
    </>
  );
});

export default EnvelopeControls;
