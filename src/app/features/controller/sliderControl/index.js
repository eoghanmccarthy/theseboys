import React, { memo, useEffect } from 'react';

import Slider from 'componentLib/slider';
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
    useEffect(() => {
      handleOnChange(initialValue, true);
    }, []);

    const handleOnChange = (val, mount = false) => {
      if (typeof val !== 'number' || val < min || val > max) return;

      mount && document.querySelector(`#${id} .control`)?.setAttribute('value', `${val}`);
      document.querySelector(`#${id} span.value`)?.setAttribute('value', val.toFixed(toFixed));

      onChange(val);
    };

    return (
      <Controller id={id} orient={orient}>
        <label className={'label'}>{label}</label>
        <div className={'controls'}>
          <Slider
            className={'control'}
            orient={orient}
            step={step}
            min={min}
            max={max}
            onChange={e => handleOnChange(parseFloat(e.target.value))}
          />
        </div>
        <span className={'value'} />
      </Controller>
    );
  }
);

export default SliderControl;
