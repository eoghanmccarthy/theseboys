import React, { memo } from 'react';
import cx from 'classnames';

const Chevron = memo(
  ({ className, width = '100%', stroke = 'var(--color-bluegrey-600)', strokeWidth = '4' }) => {
    return (
      <svg
        className={cx('svg-icon', className)}
        width={width}
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="0,10 15,20 30,10"
          fill={'transparent'}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }
);

export default Chevron;
