import React, { memo, useEffect } from 'react';
import cx from 'classnames';

import './styles.css';

import Control from '../control';

import interpolate from 'utils/studioHelpers/interpolate';

const SliderControl = memo(
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

    const name = `${trackId}__control--${effectName}`;

    useEffect(() => {
      handleSetInputValue(node.get()[param]);
      handleSetValueLabel(node.get()[param]);
    }, []);

    const interpolateValue = interpolate({
      inputRange: [min, max],
      outputRange: [0, 100],
      clamp: true
    });

    const handleSetInputValue = val => {
      document.querySelector(`.control__slider.${name}`).setAttribute('value', val);
    };

    const handleSetValueLabel = val => {
      document
        .querySelector(`.ui-control__value.${name}`)
        .setAttribute(
          'data-value',
          showPercentageValue
            ? Math.round(interpolateValue(val)).toString()
            : parseFloat(val).toFixed(toFixed)
        );
    };

    return (
      <Control type={'slider-control'} orientation={orientation} controlName={name} label={label}>
        <input
          className={cx('control__slider', name)}
          orient={orientation}
          type={'range'}
          step={step}
          max={max}
          min={min}
          onChange={e => {
            const val = e.target.value;

            handleSetInputValue(val);
            handleSetValueLabel(val);

            node.set({ [param]: val });
          }}
        />
      </Control>
    );
  }
);

export default SliderControl;
