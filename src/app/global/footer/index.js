import React from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import Logo from 'componentLib/logo';

const Footer = () => {
  const auth = useSelector(state => state.app.authentication);

  return (
    <footer className={'footer'}>
      <Logo />
    </footer>
  );
};

export default Footer;
