import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.css';

const Slider = memo(
  forwardRef(
    (
      {
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
      },
      ref
    ) => {
      return (
        <input
          ref={ref}
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
  )
);

export default Slider;

Slider.propTypes = {
  orient: PropTypes.string,
  isDisabled: PropTypes.bool,
  step: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
