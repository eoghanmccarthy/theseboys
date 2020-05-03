import React from 'react';
import { useSelector } from 'react-redux';

import styles from './styles';

import Logo from 'componentLib/logo';

const Footer = () => {
  const auth = useSelector(state => state.app.authentication);

  return (
    <footer css={styles}>
      <Logo />
    </footer>
  );
};

export default Footer;
