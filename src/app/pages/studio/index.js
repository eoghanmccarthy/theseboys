import React, { Fragment, useRef } from 'react';
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

const TRACKS = ['track-a', 'track-b', 'track-c', 'track-d'];

const defaults = {
  master: { volume: 75, bpm: 120 },
  [TRACKS[0]]: {
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
  [TRACKS[1]]: {
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
    eq3: { low: 75, mid: 75, high: 75 },
    distortion: { wet: 0 },
    reverb: { wet: 60 },
    delay: { wet: 0 }
  },
  [TRACKS[2]]: {
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
  [TRACKS[3]]: {
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
  const trackARef = useRef();
  const trackBRef = useRef();

  const handleSave = () => {
    trackARef.current.save();
    trackBRef.current.save();
  };

  return (
    <Fragment>
      <Main className={'studio'}>
        <Master onSave={handleSave} initialValue={store.master || defaults.master} />
        <Track ref={trackARef} trackId={TRACKS[0]}>
          <MembraneSynth01
            trackId={TRACKS[0]}
            config={{ notes: ['C1'], numSteps: 16 }}
            initialValue={store[TRACKS[0]] || defaults[TRACKS[0]]}
          />
        </Track>
        <Track ref={trackBRef} trackId={TRACKS[1]}>
          <MetalSynth01
            trackId={TRACKS[1]}
            config={{ notes: ['C1'], numSteps: 16 }}
            initialValue={store[TRACKS[1]] || defaults[TRACKS[1]]}
          />
        </Track>
        <Track trackId={TRACKS[2]}>
          <NoiseSynth01
            trackId={TRACKS[2]}
            config={{ numSteps: 16 }}
            initialValue={store[TRACKS[2]] || defaults[TRACKS[2]]}
          />
        </Track>
        <Track trackId={TRACKS[3]}>
          <NoiseSynth02
            trackId={TRACKS[3]}
            config={{ numSteps: 16 }}
            initialValue={store[TRACKS[3]] || defaults[TRACKS[3]]}
          />
        </Track>
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
