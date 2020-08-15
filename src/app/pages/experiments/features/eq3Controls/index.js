import React, { memo } from 'react';

import { SliderControl, ControlsGroup } from '../../ui';

const Eq3Controls = memo(({ trackId, eq3 }) => {
  if (!eq3) return null;

  return (
    <ControlsGroup orientation={'horizontal'}>
      <SliderControl
        trackId={trackId}
        node={eq3}
        param={'low'}
        effectName={'low'}
        label={'LOW'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <SliderControl
        trackId={trackId}
        node={eq3}
        param={'mid'}
        effectName={'mid'}
        label={'MID'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <SliderControl
        trackId={trackId}
        node={eq3}
        param={'high'}
        effectName={'high'}
        label={'HIH'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
    </ControlsGroup>
  );
});

export default Eq3Controls;
