import React from 'react';
import { css } from '@emotion/core';

import * as styles from './styles';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const Module = ({ children, index, data }) => {
  return (
    <div
      css={css`
        transform: translateX(${index * 100}%);
        ${styles.module}
      `}
    >
      <div css={styles.moduleMain}>{children}</div>
    </div>
  );
};

export default Module;
