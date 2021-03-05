import React from 'react';
import { useLocation, useHistory } from 'react-router';

import './index.css';

import Logo from 'componentLib/Logo';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <footer className={'me__footer'}>
      <Logo onClick={() => history.push(location.pathname === '/' ? '/studio' : '/')} />
    </footer>
  );
};

export default Footer;
