import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

const Button = memo(
  ({ children, id, className, size = 48, shape = 'circle', onClick, ...rest }) => {
    return (
      <button
        id={id}
        className={cx(`ui-button`, { [`size-${size}`]: size, [shape]: shape }, className)}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
