import React, { Fragment, useRef, createRef } from 'react';

import './index.css';

import Main from 'global/main';
import Footer from 'global/footer';

import Track from 'features/track';
import { Master } from 'features/master';

const TRACKS = [
  { id: 'track-a', config: { notes: ['C1'], numSteps: 16 }, instrument: 'tom' },
  { id: 'track-b', config: { notes: ['C1'], numSteps: 16 }, instrument: 'bell' },
  { id: 'track-c', config: { numSteps: 16 }, instrument: 'cymbal' },
  { id: 'track-d', config: { numSteps: 16 }, instrument: 'hat' }
];

const defaults = {
  master: { volume: 75, bpm: 120 },
  tracks: {
    'track-a': {
      id: 'track-a',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      channel: {
        pan: 0,
        volume: 90,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          envelope: {
            attack: 0.001,
            decay: 0.45,
            sustain: 0.1,
            release: 0.3
          }
        },
        effects: {
          compressor: {
            threshold: -30,
            ratio: 6,
            attack: 0.0001,
            release: 0.1
          },
          eq3: { low: 75, mid: 8, high: 8 }
        }
      }
    },
    'track-b': {
      id: 'track-b',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      channel: {
        pan: 0.7,
        volume: 90,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          envelope: {
            attack: 2.0,
            decay: 0.4,
            sustain: 0.512,
            release: 0.067
          }
        },
        effects: {
          eq3: { low: 75, mid: 75, high: 75 },
          distortion: { wet: 0 },
          reverb: { wet: 60 },
          delay: { wet: 0 }
        }
      }
    },
    'track-c': {
      id: 'track-c',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      channel: {
        pan: -0.5,
        volume: 82,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          envelope: {
            attack: 0.001,
            decay: 0.3,
            sustain: 0,
            release: 0.3
          }
        },
        effects: { eq3: { low: 0, mid: 18, high: 86 }, filter: { Q: 2, frequency: 10000 } }
      }
    },
    'track-d': {
      id: 'track-d',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      channel: {
        pan: 0.8,
        volume: 88,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          envelope: {
            attack: 0.01,
            decay: 0.15,
            sustain: 0.0,
            release: 0.06
          }
        },
        effects: { eq3: { low: 0, mid: 0, high: 82 }, filter: { Q: 2, frequency: 8000 } }
      }
    }
  }
};

const Studio = () => {
  const tracksRef = useRef(TRACKS.map(() => createRef()));

  const handleSave = () => {
    tracksRef.current.forEach(track => {
      track.current.save();
    });
  };

  return (
    <Fragment>
      <Main className={'studio'}>
        <Master defaultValue={defaults.master} onSave={handleSave} />
        {TRACKS.map((track, i) => {
          const { id, config, instrument } = track;
          return (
            <Track
              key={id}
              ref={tracksRef.current[i]}
              index={i}
              trackId={id}
              config={config}
              defaultValue={defaults.tracks[id]}
              instrument={instrument}
            />
          );
        })}
      </Main>
      <Footer />
    </Fragment>
  );
};

export default Studio;
