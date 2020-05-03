import React from 'react';
import { css } from '@emotion/core';

import styles from './styles';

const Header = () => {
  return (
    <header
      css={css`
        ${styles}
      `}
    />
  );
};

export default Header;
