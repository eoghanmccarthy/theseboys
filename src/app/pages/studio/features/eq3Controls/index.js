import React, { memo } from 'react';

import { SliderControl, ControlGroup } from '../../ui';

const Eq3Controls = memo(({ trackId, eq3 }) => {
  if (!eq3) return null;

  return (
    <ControlGroup orientation={'horizontal'} title={'equaliser'}>
      <SliderControl
        trackId={trackId}
        node={eq3}
        param={'low'}
        effectName={'eq3-low'}
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
        effectName={'eq3-mid'}
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
        effectName={'eq3-high'}
        label={'HIH'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
    </ControlGroup>
  );
});

export default Eq3Controls;
