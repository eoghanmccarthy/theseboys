import React from 'react';
import { css } from '@emotion/core';
import cx from 'classnames';

import './styles.scss';

const Control = ({ children, size = 'md', ...rest }) => {
  return (
    <div
      className={cx('control', { [size]: size })}
      css={css`
        height: 64px;
        padding: 5px;
        border: 1px solid slategrey;
        border-radius: 4px;
      `}
    >
      {children}
    </div>
  );
};

export default Control;
