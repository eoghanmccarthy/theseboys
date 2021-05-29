import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Minus, Plus } from 'componentLib/icon';
import Button from 'componentLib/button';
//import Button from '@eoghanmccarthy/theseboys-button';
import Controller from '../controller';

const ButtonControl = memo(
  ({
    id,
    orient = 'vertical',
    label,
    step = 1,
    min = 0,
    max = 100,
    initialValue,
    toFixed = 0,
    onChange
  }) => {
    useEffect(() => {
      handleOnChange(initialValue);
    }, [initialValue]);

    const handleOnChange = val => {
      if (typeof val !== 'number' || val < min || val > max) return;

      document.querySelectorAll(`#${id} .control`)?.forEach(e => e.setAttribute('value', `${val}`));
      document.querySelector(`#${id} span.value`)?.setAttribute('value', val.toFixed(toFixed));

      if (val > min && val < max) {
        document
          .querySelectorAll(`#${id} .control`)
          ?.forEach(e => e.classList.contains('alert') && e.classList.remove('alert'));
      } else if (val === min) {
        document.querySelector(`#${id} .control.dec`)?.classList.add('alert');
      } else if (val === max) {
        document.querySelector(`#${id} .control.inc`)?.classList.add('alert');
      }

      onChange(val);
    };

    return (
      <Controller id={id} orient={orient}>
        <label className={'label'}>{label}</label>
        <div className={'controls'}>
          <Button
            className={'control dec'}
            size={28}
            onClick={e => {
              const next = parseFloat(e.target.value) - step;
              if (next < min) return;
              handleOnChange(next);
            }}
          >
            <Minus width={'72%'} />
          </Button>
          <Button
            className={'control inc'}
            size={28}
            onClick={e => {
              const next = parseFloat(e.target.value) + step;
              if (next > max) return;
              handleOnChange(next);
            }}
          >
            <Plus width={'72%'} />
          </Button>
        </div>
        <span className={'value'} />
      </Controller>
    );
  }
);

export default ButtonControl;
