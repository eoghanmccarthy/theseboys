import React from 'react';
import { useLocation, useHistory } from 'react-router';

import './index.css';

import Logo from '../../Logo';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <footer className={'me__footer'}>
      <Logo
        fill={'var(--color-grey-800)'}
        onClick={() => history.push(location.pathname === '/' ? '/studio' : '/')}
      />
    </footer>
  );
};

export default Footer;
