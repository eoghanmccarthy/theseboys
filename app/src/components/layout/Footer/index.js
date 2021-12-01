import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './index.css';

import Logo from '../../Logo';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className={'me__footer'}>
      <Link reloadDocument to={location.pathname === '/' ? '/studio' : '/'}>
        <Logo fill={'var(--color-grey-800)'} />
      </Link>
    </footer>
  );
};

export default Footer;
