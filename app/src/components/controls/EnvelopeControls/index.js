import React, { memo } from 'react';

import { SliderControl } from '../../controllers';

const EnvelopeControls = memo(({ trackId, initialValue, onChange }) => {
  if (!trackId || !initialValue) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-envelope--attack`}
        label={'ATK'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={initialValue.attack ?? 0}
        onChange={val => onChange({ attack: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--decay`}
        label={'DEC'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={initialValue.decay ?? 0}
        onChange={val => onChange({ decay: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--sustain`}
        label={'SUS'}
        step={0.001}
        toFixed={3}
        initialValue={initialValue.sustain ?? 0}
        onChange={val => onChange({ sustain: val })}
      />
      <SliderControl
        id={`${trackId}-envelope--release`}
        label={'REL'}
        step={0.001}
        max={2}
        toFixed={3}
        initialValue={initialValue.release ?? 0}
        onChange={val => onChange({ release: val })}
      />
    </>
  );
});

export default EnvelopeControls;
