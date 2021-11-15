import React, { memo, useEffect, useRef } from 'react';

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
    initialValue,
    toFixed = 0,
    onChange
  }) => {
    const controlRef = useRef(null);
    const valueRef = useRef(null);

    useEffect(() => {
      handleOnChange(initialValue);
    }, [initialValue]);

    const handleOnChange = (val, setInputValue = true) => {
      if (
        !controlRef?.current ||
        !valueRef?.current ||
        typeof val !== 'number' ||
        val < min ||
        val > max
      )
        return;

      if (setInputValue) {
        controlRef.current.value = `${val}`;
      }

      valueRef.current.setAttribute('value', val.toFixed(toFixed));

      onChange(val);
    };

    return (
      <Controller id={id} orient={orient}>
        <label className={'label'}>{label}</label>
        <div className={'controls'}>
          <Slider
            ref={controlRef}
            className={'control'}
            orient={orient}
            step={step}
            min={min}
            max={max}
            onChange={e => handleOnChange(parseFloat(e.target.value), false)}
            onKeyDown={e => {
              switch (e.key) {
                case 'q':
                  handleOnChange(min);
                  break;
                case 'w':
                  handleOnChange(max);
                  break;
                case 'e':
                  handleOnChange(initialValue);
                  break;
                default:
                  break;
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
