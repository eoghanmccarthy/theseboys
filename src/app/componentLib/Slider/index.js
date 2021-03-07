import React, { memo } from 'react';
import { func, number } from 'prop-types';
import cx from 'classnames';

import './styles.css';

import baseProps from '../baseProps';

const Slider = memo(
  ({
    className,
    orient = 'horizontal',
    isDisabled = false,
    step = 0.1,
    min = 0,
    max = 1,
    onChange,
    ...rest
  }) => {
    return (
      <input
        className={cx(
          'ui-slider',
          { [`orient-${orient}`]: orient, disabled: isDisabled },
          className
        )}
        disabled={isDisabled}
        orient={orient}
        type={'range'}
        step={step}
        max={max}
        min={min}
        onChange={onChange}
        {...rest}
      />
    );
  }
);

export default baseProps(Slider);

Slider.propTypes = {
  max: number,
  min: number,
  step: number,
  onChange: func.isRequired
};
