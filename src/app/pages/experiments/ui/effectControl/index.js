import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import EffectControlButton from '../effectControlButton';

const EffectControl = memo(
  ({
    node,
    sequencerName,
    effectName,
    param = 'wet',
    orientation = 'vertical',
    label,
    step = 0.1,
    min = 0,
    max = 1,
    showPercentageValue = false,
    toFixed = 1
  }) => {
    if (!node) {
      return null;
    }

    const controlName = `${sequencerName}__effect-ctrl--${effectName}`;

    return (
      <div className={cx('effect-control', { [orientation]: orientation })}>
        <span className={`effect-control__label ${controlName}`}>{label}</span>
        <EffectControlButton
          controlName={controlName}
          node={node}
          param={param}
          step={step}
          min={min}
          max={max}
          showPercentageValue={showPercentageValue}
          toFixed={toFixed}
        >
          +
        </EffectControlButton>
        <span className={`effect-control__value ${controlName}`} />
        <EffectControlButton
          controlName={controlName}
          node={node}
          param={param}
          step={step}
          dec
          min={min}
          max={max}
          showPercentageValue={showPercentageValue}
          toFixed={toFixed}
        >
          -
        </EffectControlButton>
      </div>
    );
  }
);

export default EffectControl;
