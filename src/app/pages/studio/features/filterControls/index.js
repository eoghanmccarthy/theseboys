import React, { memo } from 'react';

import { SliderControl } from '../../ui';

const FilterControls = memo(({ trackId, filter }) => {
  if (!filter) return null;

  return (
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
  );
});

export default FilterControls;
