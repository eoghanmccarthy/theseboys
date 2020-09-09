import React, { Fragment } from 'react';

import './index.css';

import TwitterLogo from 'src/assets/Twitter_Social_Icon_Circle_Color.svg';

import Main from 'global/main';
import Footer from 'global/footer';
import Logo from 'componentLib/Logo';

const Home = () => {
  return (
    <Fragment>
      <Main className={'index'}>
        <Logo animate />
        <div className={'social-links'}>
          <a href={'http://twitter.com/theseboys'} target={'_blank'}>
            <img className={'social-twitter'} src={TwitterLogo} />
          </a>
          <iframe
            allowTransparency="true"
            scrolling="no"
            frameBorder="no"
            src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Ftheseboys&color=orange_white&size=24"
            style={{ width: '24px', height: '24px' }}
          />
        </div>
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Home;
