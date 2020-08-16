import React from 'react';

import './index.css';

import Oscillator from 'features/oscillator';

import useBell01 from 'features/sounds/useBell01';
import useConga01 from 'features/sounds/useConga01';
import useKick01 from 'features/sounds/useKick01';
import useKick02 from 'features/sounds/useKick02';
import useSnare01 from 'features/sounds/useSnare01';
import useSnare02 from 'features/sounds/useSnare02';
import useMonoSynth from 'features/sounds/useMonoSynth';
import Master from './features/master';
import RandomSequencer from './features/randomSequencer';
import StepSequencer from './features/stepSequencer';
import MembraneSynth01 from './features/membraneSynth01';
import MetalSynth01 from './features/metalSynth01';
import NoiseSynth01 from './features/noiseSequencer01';
import NoiseSynth02 from './features/noiseSequencer02';

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
      <Master />
      {/*<StepSequencer trackId={'001'} />*/}
      <MembraneSynth01
        trackId={'kick'}
        channelDefaults={{
          pan: 0,
          volume: 12,
          mute: false,
          solo: false
        }}
      />
      <MetalSynth01
        trackId={'conga'}
        channelDefaults={{
          pan: 0.7,
          volume: 12,
          mute: false,
          solo: false
        }}
      />
      <NoiseSynth01
        trackId={'hi-hat'}
        channelDefaults={{
          pan: -0.6,
          volume: 10,
          mute: false,
          solo: false
        }}
      />
      <NoiseSynth02
        trackId={'closed-hi-hat'}
        channelDefaults={{
          pan: 0.8,
          volume: 10,
          mute: false,
          solo: false
        }}
      />
      {/*<Meta>*/}
      {/*  <PlaybackButton onClick={() => conga01.trigger()} />*/}
      {/*</Meta>*/}
      {/*<Panel />*/}
      {/*<Meta>*/}
      {/*  <PlaybackButton onClick={() => kick02.trigger()} />*/}
      {/*</Meta>*/}
      {/*<Panel />*/}
      {/*<Meta>*/}
      {/*  <PlaybackButton onClick={() => kick01.trigger()} />*/}
      {/*</Meta>*/}
      {/*<Panel />*/}
      {/*<Meta>*/}
      {/*  <PlaybackButton onClick={() => snare01.trigger()} />*/}
      {/*</Meta>*/}
      {/*<Panel />*/}
      {/*<Meta>*/}
      {/*  <PlaybackButton onClick={() => snare02.trigger()} />*/}
      {/*</Meta>*/}
      {/*<Panel />*/}
      {/*<Meta>*/}
      {/*  <PlaybackButton onClick={() => monoSynth.trigger()} />*/}
      {/*</Meta>*/}
      {/*<Panel />*/}
      {/*<RandomSequencer />*/}
      {/*<Meta>ppp</Meta>*/}
      {/*<Panel>*/}
      {/*  <Oscillator />*/}
      {/*</Panel>*/}
    </main>
  );
};

export default Experiments;
