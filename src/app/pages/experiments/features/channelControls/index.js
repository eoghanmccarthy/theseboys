import React, { Fragment, memo } from 'react';

import { ControlsGroup, EffectControl } from '../../ui';

const ChannelControls = memo(({ trackId, channel }) => {
  if (!channel) return null;

  return (
    <ControlsGroup orientation={'horizontal'}>
      <EffectControl
        trackId={trackId}
        orientation={'horizontal'}
        node={channel}
        param={'volume'}
        effectName={'volume'}
        label={'VOL'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <EffectControl
        trackId={trackId}
        orientation={'horizontal'}
        node={channel}
        param={'pan'}
        effectName={'pan'}
        label={'PAN'}
        min={-1}
      />
    </ControlsGroup>
  );
});

export default ChannelControls;
