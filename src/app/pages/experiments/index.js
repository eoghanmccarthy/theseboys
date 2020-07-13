import React from 'react';

import './index.css';

import { Panel, Meta, PlayButton } from './ui';
import Oscillator from 'features/oscillator';

import useBell01 from 'features/sounds/useBell01';
import useConga01 from 'features/sounds/useConga01';
import useKick01 from 'features/sounds/useKick01';
import useKick02 from 'features/sounds/useKick02';
import useSnare01 from 'features/sounds/useSnare01';
import useSnare02 from 'features/sounds/useSnare02';
import useMonoSynth from 'features/sounds/useMonoSynth';
import RandomSequencer from './features/randomSequencer';
import StepSequencer from './features/stepSequencer';
import KickSequencer from './features/kickSequencer';
import Analyser from './features/analyser';

const Experiments = () => {
  const bell01 = useBell01();
  const conga01 = useConga01();
  const kick01 = useKick01();
  const kick02 = useKick02();
  const snare01 = useSnare01();
  const snare02 = useSnare02();
  const monoSynth = useMonoSynth();

  return (
    <main className={'me__content experiments'}>
      <StepSequencer />
      <KickSequencer />
      <Analyser />
      <Meta>
        <PlayButton onClick={() => conga01.trigger()} />
      </Meta>
      <Panel />
      <Meta>
        <PlayButton onClick={() => kick02.trigger()} />
      </Meta>
      <Panel />
      <Meta>
        <PlayButton onClick={() => kick01.trigger()} />
      </Meta>
      <Panel />
      <Meta>
        <PlayButton onClick={() => snare01.trigger()} />
      </Meta>
      <Panel />
      <Meta>
        <PlayButton onClick={() => snare02.trigger()} />
      </Meta>
      <Panel />
      <Meta>
        <PlayButton onClick={() => monoSynth.trigger()} />
      </Meta>
      <Panel />
      <RandomSequencer />
      <Meta>ppp</Meta>
      <Panel>
        <Oscillator />
      </Panel>
    </main>
  );
};

export default Experiments;
