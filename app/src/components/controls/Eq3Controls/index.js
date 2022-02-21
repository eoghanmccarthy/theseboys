import React, { memo } from 'react';

import { DECIBEL_MIN, DECIBEL_MAX, FREQUENCY_MIN, FREQUENCY_MAX } from '../../../utils/constants';
import { SliderControl } from '../../controllers';

const Eq3Controls = memo(({ trackId, node }) => {
  if (!trackId || !node) return null;

  return (
    <>
      <SliderControl
        id={`${trackId}-eq3--low`}
        label={'LOW'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={node.get().low ?? 0}
        onChange={(val, time) => node.low.rampTo(val, time)}
      />
      <SliderControl
        id={`${trackId}-eq3--mid`}
        label={'MID'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={node.get().mid ?? 0}
        onChange={(val, time) => node.mid.rampTo(val, time)}
      />
      <SliderControl
        id={`${trackId}-eq3--high`}
        label={'HIG'}
        step={1}
        min={DECIBEL_MIN}
        max={DECIBEL_MAX}
        initialValue={node.get().high ?? 0}
        onChange={(val, time) => node.high.rampTo(val, time)}
      />
      <SliderControl
        id={`${trackId}-eq3--low-frequency`}
        label={'LPF'}
        step={10}
        min={FREQUENCY_MIN}
        max={FREQUENCY_MAX}
        initialValue={node.get().lowFrequency ?? 1000}
        onChange={(val, time) => node.lowFrequency.rampTo(val, time)}
      />
      <SliderControl
        id={`${trackId}-eq3--high-frequency`}
        label={'HPF'}
        step={10}
        min={FREQUENCY_MIN}
        max={FREQUENCY_MAX}
        initialValue={node.get().highFrequency ?? 1000}
        onChange={(val, time) => node.highFrequency.rampTo(val, time)}
      />
    </>
  );
});

export default Eq3Controls;
