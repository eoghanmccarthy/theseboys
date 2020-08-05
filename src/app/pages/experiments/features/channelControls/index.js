import React, { Fragment, memo } from 'react';

import { EffectControl } from '../../ui';

const ChannelControls = memo(({ sequencerName, channel }) => {
  if (!channel) return null;

  return (
    <Fragment>
      <EffectControl
        node={channel}
        param={'volume'}
        sequencerName={sequencerName}
        effectName={'volume'}
        label={'VOL'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <EffectControl
        node={channel}
        param={'pan'}
        sequencerName={sequencerName}
        effectName={'pan'}
        label={'PAN'}
        min={-1}
      />
    </Fragment>
  );
});

export default ChannelControls;
