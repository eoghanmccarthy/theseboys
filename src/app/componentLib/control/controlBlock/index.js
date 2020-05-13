import React from 'react';
import { css } from '@emotion/core';
import cx from 'classnames';

import './styles.scss';

const ControlBlock = ({ children, direction = 'row' }) => {
  return <div className={cx('control-block', { [direction]: direction })}>{children}</div>;
};

export default ControlBlock;
