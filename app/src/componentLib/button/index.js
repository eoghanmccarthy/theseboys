import React, { memo } from 'react';
import { oneOf } from 'prop-types';
import cx from 'classnames';

import './styles.css';

const Button = memo(
  ({
    children,
    id,
    testId,
    isDisabled = false,
    className,
    role = 'button',
    type = 'button',
    size = 48,
    shape = 'circle',
    variant,
    ...rest
  }) => {
    return (
      <button
        id={id}
        data-testid={testId}
        disabled={isDisabled}
        className={cx(
          'tb-button',
          {
            [`size-${size}`]: size && variant !== 'text',
            [shape]: shape && variant !== 'text',
            [variant]: variant,
            disabled: isDisabled
          },
          className
        )}
        role={role}
        type={type}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;

Button.propTypes = {
  size: oneOf([24, 28, 32, 36, 40, 44, 48]),
  shape: oneOf(['circle', 'rounded'])
};
