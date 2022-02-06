import React, { Fragment } from 'react';

import { Footer, Main } from 'components/layout';
import { Master, useMasterContext } from 'components/master';
import Oscillator from '../../components/oscillator';

const Sounds = () => {
  const { play, stop, record } = useMasterContext('<Beats>');

  return (
    <Fragment>
      <Main id={'studio'} className={'beats'}>
        <Master volume={0} bpm={120} />
        <Oscillator />
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Sounds;
