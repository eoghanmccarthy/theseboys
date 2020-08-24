import React, { memo } from 'react';

import { SliderControl, ControlGroup } from '../../ui';

const FilterControls = memo(({ trackId, filter }) => {
  if (!filter) return null;

  return (
    <ControlGroup orientation={'horizontal'} title={'filter'}>
      <SliderControl
        trackId={trackId}
        node={filter}
        param={'frequency'}
        effectName={'filter-frequency'}
        label={'FRQ'}
        step={100}
        min={1000}
        max={15000}
        toFixed={0}
      />
    </ControlGroup>
  );
});

export default FilterControls;
