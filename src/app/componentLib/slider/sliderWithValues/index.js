import React from 'react';
import { css } from '@emotion/core';

import * as styles from './styles';

import Slider from '../slider';

const SliderWithValues = ({ title, unit = '', step, min, max, value, onChange }) => {
  return (
    <div css={styles.container}>
      <div className={'slider'}>
        <Slider step={step} min={min} max={max} value={value} onChange={onChange} />
      </div>
      <div css={styles.meta}>
        <span css={styles.title}>{title}</span>
        <span css={styles.value}>
          {value}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default SliderWithValues;
