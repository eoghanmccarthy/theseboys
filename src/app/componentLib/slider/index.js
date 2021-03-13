import React, { memo } from 'react';
import { func, number, string } from 'prop-types';
import cx from 'classnames';

import './styles.css';

const Slider = memo(
  ({
    id,
    testId,
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
        id={id}
        data-testid={testId}
        className={cx(
          'tb-slider',
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

export default Slider;

Slider.propTypes = {
  max: number,
  min: number,
  step: number,
  onChange: func.isRequired
};
