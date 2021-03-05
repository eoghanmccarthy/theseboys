import React, { memo } from 'react';

import { SliderControl, ControlGroup } from '../../ui';

const CompressorControls = memo(({ trackId, compressor }) => {
  if (!compressor) return null;

  return (
    <>
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
        effectName={'compressor-attack'}
        label={'ATK'}
        step={0.001}
        toFixed={3}
      />
      <SliderControl
        trackId={trackId}
        node={compressor}
        param={'release'}
        effectName={'compressor-release'}
        label={'REL'}
        step={0.001}
        toFixed={3}
      />
    </>
  );
});

export default CompressorControls;
