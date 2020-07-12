import React, { memo } from 'react';

import './styles.css';

import EffectCtrlButton from '../effectCtrlButton';

const EffectControls = memo(
  ({ node, sequencerName, name, param = 'wet', label, step = 0.1, min = 0, max = 1 }) => {
    if (!node) {
      return null;
    }

    return (
      <div className={'step-seq__effect-ctrls'}>
        <EffectCtrlButton
          sequencerName={sequencerName}
          name={name}
          node={node}
          param={param}
          step={step}
          min={min}
          max={max}
        >
          +
        </EffectCtrlButton>
        <span className={'effect-label'}>{label}</span>
        <EffectCtrlButton
          sequencerName={sequencerName}
          name={name}
          node={node}
          param={param}
          step={step}
          dec
          min={min}
          max={max}
        >
          <span />
        </EffectCtrlButton>
      </div>
    );
  }
);

export default EffectControls;
