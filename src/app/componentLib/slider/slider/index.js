import React from 'react';

import * as styles from './styles';

import './styles.scss';

const Slider = ({ min, max, step = 1, value, onChange, enableKeyEvents = false }) => {
  return (
    <input
      css={styles.input}
      type={'range'}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      {...(!enableKeyEvents && {
        onKeyDown: e => {
          e.preventDefault();
        }
      })}
    />
  );
};

export default Slider;
