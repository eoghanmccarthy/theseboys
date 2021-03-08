import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from 'componentLib/Button';
import Controller from '../controller';

const ButtonControl = ({
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
  }, []);

  const handleOnChange = val => {
    const num = parseFloat(val);
    if (num < min || num > max) return;

    document.querySelectorAll(`#${id} .control`)?.forEach(e => e.setAttribute('value', `${num}`));
    document.querySelector(`#${id} span.value`)?.setAttribute('value', num.toFixed(toFixed));

    if (num > min && num < max) {
      document
        .querySelectorAll(`#${id} .control`)
        ?.forEach(e => e.classList.contains('alert') && e.classList.remove('alert'));
    } else if (num === min) {
      document.querySelector(`#${id} .control.dec`)?.classList.add('alert');
    } else if (num === max) {
      document.querySelector(`#${id} .control.inc`)?.classList.add('alert');
    }

    onChange(num);
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
          -
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
          +
        </Button>
      </div>
      <span className={'value'} />
    </Controller>
  );
};

export default ButtonControl;
