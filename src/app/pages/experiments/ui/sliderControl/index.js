import React, { memo, useEffect } from 'react';
import cx from 'classnames';

import './styles.css';

import interpolate from 'utils/helpers/interpolate';

const SliderControl = memo(
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

    const controlName = `${sequencerName}__slider-control--${effectName}`;

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
      document.querySelector(`.slider-control__slider.${controlName}`).setAttribute('value', val);
    };

    const handleSetValueLabel = val => {
      document
        .querySelector(`.slider-control__value.${controlName}`)
        .setAttribute(
          'data-value',
          showPercentageValue ? Math.round(interpolateValue(val)).toString() : val.toFixed(toFixed)
        );
    };

    return (
      <div className={cx('slider-control', { [orientation]: orientation })}>
        <span className={`slider-control__label ${controlName}`}>{label}</span>
        <input
          className={cx('slider-control__slider', controlName)}
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
        <span className={`slider-control__value ${controlName}`} />
      </div>
    );
  }
);

export default SliderControl;
