import React, { Fragment } from 'react';

import './index.css';

import Oscillator from 'features/oscillator';
import Main from 'global/main';
import Footer from 'global/footer';

import { Master } from 'features/master';
import RandomSequencer from './features/randomSequencer';
import StepSequencer from './features/stepSequencer';
import MembraneSynth01 from './features/membraneSynth01';
import MetalSynth01 from './features/metalSynth01';
import NoiseSynth01 from './features/noiseSequencer01';
import NoiseSynth02 from './features/noiseSequencer02';

const Experiments = () => {
  return (
    <Fragment>
      <Main className={'studio'}>
        <Master />
        <MembraneSynth01
          trackId={`track-A`}
          channelDefaults={{
            pan: 0,
            volume: 12,
            mute: false,
            solo: false
          }}
        />
        <MetalSynth01
          trackId={`track-B`}
          channelDefaults={{
            pan: 0.7,
            volume: 12,
            mute: false,
            solo: false
          }}
        />
        <NoiseSynth01
          trackId={`track-C`}
          channelDefaults={{
            pan: -0.5,
            volume: -4,
            mute: false,
            solo: false
          }}
        />
        <NoiseSynth02
          trackId={`track-D`}
          channelDefaults={{
            pan: 0.8,
            volume: -8,
            mute: false,
            solo: false
          }}
        />
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Experiments;
