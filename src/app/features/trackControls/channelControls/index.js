import React, { memo } from 'react';

import { fromPercent } from 'features/utils';

import { ControlGroup } from 'pages/studio/ui';
import ButtonControl from 'features/buttonControl';

const VOL_MIN = -60;
const VOL_MAX = 20;

const ChannelControls = memo(({ trackId, channel }) => {
  if (!trackId || !channel) return null;

  return (
    <ControlGroup orientation={'horizontal'}>
      <ButtonControl
        id={`${trackId}-volume`}
        orient={'horizontal'}
        label={'VOL'}
        max={100}
        initialValue={90}
        onChange={val => channel.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val, 0) })}
      />
      <ButtonControl
        id={`${trackId}-pan`}
        orient={'horizontal'}
        label={'PAN'}
        min={-1}
        initialValue={0}
        onChange={val => channel.set({ pan: val })}
      />
    </ControlGroup>
  );
});

export default ChannelControls;
