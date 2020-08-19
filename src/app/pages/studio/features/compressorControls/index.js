import React, { memo } from 'react';

import { SliderControl, ControlsGroup } from '../../ui';

const CompressorControls = memo(({ trackId, compressor }) => {
  if (!compressor) return null;

  return (
    <ControlsGroup orientation={'horizontal'}>
      <SliderControl
        trackId={trackId}
        node={compressor}
        param={'ratio'}
        effectName={'ratio'}
        label={'RAT'}
        step={1}
        min={1}
        max={20}
      />
      <SliderControl
        trackId={trackId}
        node={compressor}
        param={'attack'}
        effectName={'attack'}
        label={'ATK'}
        step={0.001}
        toFixed={3}
      />
      <SliderControl
        trackId={trackId}
        node={compressor}
        param={'release'}
        effectName={'release'}
        label={'REL'}
        step={0.001}
        toFixed={3}
      />
    </ControlsGroup>
  );
});

export default CompressorControls;
