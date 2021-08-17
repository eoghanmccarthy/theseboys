import React, { memo } from 'react';

import { SliderControl } from '../controller';

const FilterControls = memo(({ trackId, effect }) => {
  if (!trackId || !effect) return null;

  return (
    <SliderControl
      id={`${trackId}-filter--frequency`}
      label={'FRQ'}
      step={100}
      min={1000}
      max={15000}
      initialValue={effect.get().frequency ?? 1000}
      onChange={val => effect.set({ frequency: val })}
    />
  );
});

export default FilterControls;
