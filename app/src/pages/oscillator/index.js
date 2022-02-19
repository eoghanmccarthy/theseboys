import React from 'react';

import { Main } from 'components/layout';
import { Master } from 'components/master';
import Oscillator from '../../components/oscillator';

const Page = () => {
  return (
    <Main id={'studio'}>
      <Master volume={0} bpm={120} />
      <Oscillator />
    </Main>
  );
};

export default Page;
