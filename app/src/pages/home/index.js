import React from 'react';

import './index.css';

import TwitterLogo from 'assets/Twitter_Social_Icon_Circle_Color.svg';
import { Footer, Main } from 'components/layout';
import Logo from 'components/Logo';

const Home = () => {
  return (
    <>
      <Main className={'index'}>
        <div>
          <Logo animate fill={'var(--color-primary)'} />
        </div>
        <div className={'social-links'}>
          <a href={'http://twitter.com/theseboys'} target={'_blank'}>
            <img alt={'Twitter logo'} style={{ width: '24px', height: '24px' }} src={TwitterLogo} />
          </a>
          <iframe
            scrolling="no"
            frameBorder="no"
            src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Ftheseboys&color=orange_white&size=24"
            style={{ width: '24px', height: '24px' }}
          />
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default Home;
