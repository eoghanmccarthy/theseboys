import React, { memo } from 'react';

import Control from '../control';
import ControlButton from '../controlButton';

const ButtonControl = memo(
  ({
    node,
    trackId,
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

    const controlName = `${trackId}__control--${effectName}`;

    return (
      <Control orientation={orientation} controlName={controlName} label={label}>
        <ControlButton
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
        </ControlButton>
        <ControlButton
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
        </ControlButton>
      </Control>
    );
  }
);

export default ButtonControl;
