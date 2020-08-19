import React, { memo } from 'react';

import { SliderControl, ControlsGroup } from '../../ui';

const EnvelopeControls = memo(({ trackId, envelope }) => {
  if (!envelope) return null;

  return (
    <ControlsGroup orientation={'horizontal'}>
      <SliderControl
        trackId={trackId}
        node={envelope}
        param={'attack'}
        effectName={'attack'}
        label={'ATK'}
        step={0.001}
        max={2}
        toFixed={3}
      />
      <SliderControl
        trackId={trackId}
        node={envelope}
        param={'decay'}
        effectName={'decay'}
        label={'DEC'}
        step={0.001}
        max={2}
        toFixed={3}
      />
      <SliderControl
        trackId={trackId}
        node={envelope}
        param={'sustain'}
        effectName={'sustain'}
        label={'SUS'}
        step={0.001}
        toFixed={3}
      />
      <SliderControl
        trackId={trackId}
        node={envelope}
        param={'release'}
        effectName={'release'}
        label={'REL'}
        step={0.001}
        max={5}
        toFixed={3}
      />
    </ControlsGroup>
  );
});

export default EnvelopeControls;
