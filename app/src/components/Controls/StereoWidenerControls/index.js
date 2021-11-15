import React, { memo } from 'react';

import { SliderControl } from '../../../features/controller';

const StereoWidenerControls = memo(({ trackId, node }) => {
  if (!trackId || !node) return null;

  return (
    <SliderControl
      id={`${trackId}-stereowidener--width`}
      label={'STW'}
      toFixed={1}
      initialValue={node.get().width ?? 0}
      onChange={val => node.set({ width: val })}
    />
  );
});

export default StereoWidenerControls;
