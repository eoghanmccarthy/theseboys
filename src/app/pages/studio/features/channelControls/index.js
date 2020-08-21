import React, { memo } from 'react';

import { ControlGroup, ButtonControl } from '../../ui';

const ChannelControls = memo(({ trackId, channel }) => {
  if (!channel) return null;

  return (
    <ControlGroup orientation={'horizontal'}>
      <ButtonControl
        trackId={trackId}
        orientation={'horizontal'}
        node={channel}
        param={'volume'}
        effectName={'channel-volume'}
        label={'VOL'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <ButtonControl
        trackId={trackId}
        orientation={'horizontal'}
        node={channel}
        param={'pan'}
        effectName={'channel-pan'}
        label={'PAN'}
        min={-1}
      />
    </ControlGroup>
  );
});

export default ChannelControls;
