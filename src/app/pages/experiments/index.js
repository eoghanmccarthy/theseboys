import React from 'react';

import './index.css';

import { Panel, PlayButton } from './ui';
import Oscillator from 'features/oscillator';

import useKick from 'features/instruments/useKick';
import useVibertSnare from 'features/instruments/useVibertSnare';
import RandomSequencer from './features/randomSequencer';

const Experiments = () => {
  const kick = useKick();
  const vibertSnare = useVibertSnare();

  return (
    <main className={'me__content experiments'}>
      <Panel>
        <PlayButton onClick={() => kick.trigger()}>kick</PlayButton>
      </Panel>
      <Panel>
        <PlayButton onClick={() => vibertSnare.trigger()}>vibert snare</PlayButton>
      </Panel>
      <Panel>
        <RandomSequencer />
      </Panel>
      <Panel>
        <Oscillator />
      </Panel>
    </main>
  );
};

export default Experiments;
