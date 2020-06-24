import React from 'react';

import './index.css';

import { Panel, Meta, PlayButton } from './ui';
import Oscillator from 'features/oscillator';

import useKick from 'features/instruments/useKick';
import useVibertSnare from 'features/instruments/useVibertSnare';
import RandomSequencer from './features/randomSequencer';
import StepSequencer from './features/stepSequencer';

const Experiments = () => {
  const kick = useKick();
  const vibertSnare = useVibertSnare();

  return (
    <main className={'me__content experiments'}>
      <Meta>
        <PlayButton onClick={() => kick.trigger()} />
      </Meta>
      <Panel />
      <Meta>
        <PlayButton onClick={() => vibertSnare.trigger()} />
      </Meta>
      <Panel />
      <RandomSequencer />
      <StepSequencer />
      <Meta>ppp</Meta>
      <Panel>
        <Oscillator />
      </Panel>
    </main>
  );
};

export default Experiments;
