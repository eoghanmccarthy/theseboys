import React, { memo } from 'react';

import { SliderControl } from '../../controllers';

const BitCrusherControls = memo(({ trackId, node }) => {
  if (!trackId || !node) return null;

  return (
    <SliderControl
      id={`${trackId}-bitcrusher--bits`}
      label={'BIT'}
      step={1}
      min={1}
      max={16}
      initialValue={node.get().bits ?? 0}
      onChange={val => node.set({ bits: val })}
    />
  );
});

export default BitCrusherControls;
