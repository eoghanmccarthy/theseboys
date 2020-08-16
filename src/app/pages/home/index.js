import React from 'react';

import './index.css';

import Main from 'global/main';
import Logo from 'componentLib/logo';

const Home = () => {
  return (
    <Main className={'index'}>
      <Logo />
    </Main>
  );
};

export default Home;
