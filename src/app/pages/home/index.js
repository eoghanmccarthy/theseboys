import React, { Fragment } from 'react';

import './index.css';

import Main from 'global/main';
import Footer from 'global/footer';
import Logo from 'componentLib/logo';

const Home = () => {
  return (
    <Fragment>
      <Main className={'index'}>
        <Logo />
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Home;
