import React, { memo } from 'react';
import { oneOf } from 'prop-types';
import cx from 'classnames';
import { Button as UIButton } from '@eoghanmccarthy/ui';

import './styles.css';

const Button = memo(({ children, className, size = 48, shape = 'circle', ...rest }) => {
  return (
    <UIButton
      className={cx('tb-button', { [`size-${size}`]: size, [shape]: shape }, className)}
      {...rest}
    >
      {children}
    </UIButton>
  );
});

export default Button;

Button.propTypes = {
  size: oneOf([24, 28, 40, 48]),
  shape: oneOf(['circle'])
};
