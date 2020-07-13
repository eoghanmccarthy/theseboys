import React, { memo } from 'react';

import './styles.css';

import EffectControlButton from '../effectCtrlButton';

const EffectControl = memo(
  ({
    node,
    sequencerName,
    name,
    param = 'wet',
    label,
    step = 0.1,
    min = 0,
    max = 1,
    showPercentageValue = false
  }) => {
    if (!node) {
      return null;
    }

    const controlName = `${sequencerName}__effect-ctrl--${name}`;

    return (
      <div className={'step-seq__effect-ctrls'}>
        <span className={`effect-label ${controlName}`}>{label}</span>
        <EffectControlButton
          controlName={controlName}
          node={node}
          param={param}
          step={step}
          min={min}
          max={max}
          showPercentageValue={showPercentageValue}
        >
          +
        </EffectControlButton>
        <span className={`effect-value ${controlName}`} />
        <EffectControlButton
          controlName={controlName}
          node={node}
          param={param}
          step={step}
          dec
          min={min}
          max={max}
          showPercentageValue={showPercentageValue}
        >
          <span />
        </EffectControlButton>
      </div>
    );
  }
);

export default EffectControl;
