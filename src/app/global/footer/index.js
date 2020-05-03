import React from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/core';

import styles from './styles';

import Logo from 'componentLib/logo';

const Footer = () => {
  const auth = useSelector(state => state.app.authentication);

  return (
    <footer
      css={css`
        ${styles}
      `}
    >
      <Logo />
    </footer>
  );
};

export default Footer;
