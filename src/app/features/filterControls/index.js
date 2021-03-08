import React, { memo } from 'react';

import { SliderControl } from '../controller';

const FilterControls = memo(({ trackId, filter, initialValue = {} }) => {
  if (!trackId || !filter) return null;

  return (
    <SliderControl
      id={`${trackId}-filter-frequency`}
      label={'FRQ'}
      step={100}
      min={1000}
      max={15000}
      initialValue={initialValue?.frequency}
      onChange={val => filter.set({ frequency: val })}
    />
  );
});

export default FilterControls;
