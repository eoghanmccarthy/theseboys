import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isNumber } from '../../../utils/typeCheck';

import Slider from 'components/slider';
import Controller from '../controller';

const SliderControl = memo(
  ({
    id,
    orient = 'vertical',
    label,
    step = 0.1,
    min = 0,
    max = 1,
    initialValue: initial,
    toFixed = 0,
    onChange
  }) => {
    const controlRef = useRef(null);
    const valueRef = useRef(null);

    const isInvalid = val => typeof val !== 'number' || val < min || val > max;

    useEffect(() => {
      if (!isInvalid(initial)) {
        controlRef.current.value = initial.toString();
        valueRef.current.innerHTML = initial.toFixed(toFixed);
      }
    }, []);

    return (
      <Controller id={id} orient={orient}>
        <label htmlFor={''} className={'label'}>
          {label}
        </label>
        <div className={'controls'}>
          <Slider
            ref={controlRef}
            className={'control'}
            orient={orient}
            step={step}
            min={min}
            max={max}
            onChange={e => {
              const val = parseFloat(e.target.value);

              if (!isInvalid(val)) {
                valueRef.current.innerHTML = val.toFixed(toFixed);
                onChange(val, 0.1);
              }
            }}
            onKeyDown={e => {
              let val;

              switch (e.key) {
                case 'q':
                  val = max;
                  break;
                case 'a':
                  val = min;
                  break;
                case 's':
                  val = initial;
                  break;
                default:
                  break;
              }

              if (!isInvalid(val)) {
                e.target.value = val;
                valueRef.current.innerHTML = val.toFixed(toFixed);
                onChange(val, 0.1);
              }
            }}
          />
        </div>
        <span ref={valueRef} className={'value'} />
      </Controller>
    );
  }
);

export default SliderControl;

SliderControl.propTypes = {
  id: PropTypes.string.isRequired,
  orient: PropTypes.oneOf(['horizontal', 'vertical']),
  label: PropTypes.string.isRequired,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  initialValue: PropTypes.number.isRequired,
  toFixed: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
