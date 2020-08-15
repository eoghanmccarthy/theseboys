import React, { Fragment, memo } from 'react';

import { SliderControl } from '../../ui';

const EnvelopeControls = memo(({ trackId, envelope }) => {
  if (!envelope) return null;

  return (
    <Fragment>
      <SliderControl
        node={envelope}
        param={'attack'}
        trackId={trackId}
        effectName={'attack'}
        label={'ATK'}
        step={0.001}
        max={5}
        toFixed={3}
      />
      <SliderControl
        node={envelope}
        param={'decay'}
        trackId={trackId}
        effectName={'decay'}
        label={'DEC'}
        step={0.001}
        max={5}
        toFixed={3}
      />
      <SliderControl
        node={envelope}
        param={'sustain'}
        trackId={trackId}
        effectName={'sustain'}
        label={'SUS'}
        step={0.01}
        showPercentageValue
      />
      <SliderControl
        node={envelope}
        param={'release'}
        trackId={trackId}
        effectName={'release'}
        label={'REL'}
        step={0.001}
        max={5}
        toFixed={3}
      />
    </Fragment>
  );
});

export default EnvelopeControls;
