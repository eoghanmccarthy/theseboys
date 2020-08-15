import React, { Fragment, memo } from 'react';

import { EffectControl } from '../../ui';

const Eq3Controls = memo(({ trackId, eq3 }) => {
  if (!eq3) return null;

  return (
    <Fragment>
      <EffectControl
        node={eq3}
        param={'low'}
        trackId={trackId}
        effectName={'low'}
        label={'LOW'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <EffectControl
        node={eq3}
        param={'mid'}
        trackId={trackId}
        effectName={'mid'}
        label={'MID'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
      <EffectControl
        node={eq3}
        param={'high'}
        trackId={trackId}
        effectName={'high'}
        label={'HIH'}
        step={1}
        min={-60}
        max={20}
        showPercentageValue
      />
    </Fragment>
  );
});

export default Eq3Controls;
