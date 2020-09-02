import React, { memo } from 'react';
import cx from 'classnames';
import { Button as UIButton } from '@eoghanmccarthy/ui';

import './styles.css';

const Button = memo(({ children, className, size = 48, shape = 'circle', ...rest }) => {
  return (
    <UIButton className={cx({ [`size-${size}`]: size, [shape]: shape }, className)} {...rest}>
      {children}
    </UIButton>
  );
});

export default Button;
