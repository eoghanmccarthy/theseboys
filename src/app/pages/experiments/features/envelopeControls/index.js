import React, { Fragment, memo } from 'react';

import { SliderControl } from '../../ui';

const EnvelopeControls = memo(({ sequencerName, envelope }) => {
  if (!envelope) return null;

  return (
    <Fragment>
      <SliderControl
        node={envelope}
        param={'attack'}
        sequencerName={sequencerName}
        effectName={'attack'}
        label={'ATK'}
        step={0.001}
        max={5}
        toFixed={3}
      />
      <SliderControl
        node={envelope}
        param={'decay'}
        sequencerName={sequencerName}
        effectName={'decay'}
        label={'DEC'}
        step={0.001}
        max={5}
        toFixed={3}
      />
      <SliderControl
        node={envelope}
        param={'sustain'}
        sequencerName={sequencerName}
        effectName={'sustain'}
        label={'SUS'}
        step={0.001}
        max={5}
        toFixed={3}
      />
      <SliderControl
        node={envelope}
        param={'release'}
        sequencerName={sequencerName}
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
