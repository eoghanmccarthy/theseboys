import React, { memo } from 'react';
import cx from 'classnames';

const Minus = memo(
  ({ className, width = '100%', stroke = 'var(--color-bluegrey-600)', strokeWidth = '5' }) => {
    return (
      <svg
        className={cx('svg-icon', className)}
        width={width}
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="15" x2="30" y2="15" stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }
);

export default Minus;
