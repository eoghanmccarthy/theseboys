import React, { memo } from 'react';
import cx from 'classnames';

export const PlayIcon = memo(
  ({
    className,
    width = '100%',
    fill = 'var(--color-bluegrey-600)',
    stroke = 'var(--color-bluegrey-600)',
    strokeWidth = '0'
  }) => {
    return (
      <svg
        className={cx('svg-icon', className)}
        width={width}
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points={'75, 25 300, 150 75, 275'}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }
);
