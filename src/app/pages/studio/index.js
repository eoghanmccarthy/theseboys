import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import './index.css';

import Main from 'global/main';
import Footer from 'global/footer';

import Track from 'features/track';
import { Master } from 'features/master';
import MembraneSynth01 from './features/membraneSynth01';
import MetalSynth01 from './features/metalSynth01';
import NoiseSynth01 from './features/noiseSequencer01';
import NoiseSynth02 from './features/noiseSequencer02';

const defaults = {
  master: { volume: 75, bpm: 120 },
  'track-a': {
    channel: {
      pan: 0,
      volume: 90,
      mute: false,
      solo: false
    },
    synth: {
      envelope: {
        attack: 0.001,
        decay: 0.45,
        sustain: 0.1,
        release: 0.3
      }
    },
    compressor: {
      threshold: -30,
      ratio: 6,
      attack: 0.0001,
      release: 0.1
    },
    eq3: { low: 75, mid: 8, high: 8 }
  },
  'track-b': {
    channel: {
      pan: 0.7,
      volume: 90,
      mute: false,
      solo: false
    },
    synth: {
      envelope: {
        attack: 2.0,
        decay: 0.4,
        sustain: 0.512,
        release: 0.067
      }
    },
    eq3: { low: 75, mid: 75, high: 75 }
  },
  'track-c': {
    channel: {
      pan: -0.5,
      volume: 82,
      mute: false,
      solo: false
    },
    synth: {
      envelope: {
        attack: 0.001,
        decay: 0.3,
        sustain: 0,
        release: 0.3
      }
    },
    eq3: { low: 0, mid: 18, high: 86 },
    filter: { Q: 2, frequency: 10000 }
  },
  'track-d': {
    channel: {
      pan: 0.8,
      volume: 88,
      mute: false,
      solo: false
    },
    synth: {
      envelope: {
        attack: 0.01,
        decay: 0.15,
        sustain: 0.0,
        release: 0.06
      }
    },
    eq3: { low: 0, mid: 0, high: 82 },
    filter: { Q: 2, frequency: 8000 }
  }
};

const Studio = () => {
  const store = useSelector(state => state.app);

  return (
    <Fragment>
      <Main className={'studio'}>
        <Master initialValue={store.master || defaults.master} />
        <Track>
          <MembraneSynth01
            trackId={'track-a'}
            config={{ notes: ['C1'], numSteps: 16 }}
            initialValue={store['track-a'] || defaults['track-a']}
          />
        </Track>
        <Track>
          <MetalSynth01
            trackId={`track-b`}
            config={{ notes: ['C1'], numSteps: 16 }}
            initialValue={store['track-b'] || defaults['track-b']}
          />
        </Track>
        <Track>
          <NoiseSynth01
            trackId={`track-c`}
            config={{ numSteps: 16 }}
            initialValue={store['track-c'] || defaults['track-c']}
          />
        </Track>
        <Track>
          <NoiseSynth02
            trackId={`track-D`}
            config={{ numSteps: 16 }}
            initialValue={store['track-d'] || defaults['track-d']}
          />
        </Track>
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
