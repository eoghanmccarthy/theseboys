import produce from 'immer';
import { FeedbackDelay } from 'tone';

export const MASTER_SAVE = 'master/SAVE';
export const TRACK_SAVE_CHANNEL = 'track/SAVE_CHANNEL';
export const TRACK_SAVE_STEPS = 'track/SAVE_STEPS';
export const TRACK_SAVE_SYNTH = 'track/SAVE_SYNTH';

const master = produce(
  (draft, action) => {
    const { type, payload } = action;
    switch (type) {
      case MASTER_SAVE:
        return payload;
    }
  },
  { volume: 75, bpm: 120 }
);

const tracks = produce(
  (draft, action) => {
    const { type, payload } = action;
    switch (type) {
      case TRACK_SAVE_CHANNEL:
        draft[payload.id] = { ...draft[payload.id], channel: payload.data };
        break;
      case TRACK_SAVE_STEPS:
        draft[payload.id] = { ...draft[payload.id], steps: payload.data };
        break;
      case TRACK_SAVE_SYNTH:
        draft[payload.id] = {
          ...draft[payload.id],
          instrument: { ...draft[payload.id].instrument, synth: payload.data }
        };
        break;
    }
  },
  {
    'track-a': {
      id: 'track-a',
      synth: 'MembraneSynth',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      effects: { equaliser: '1 / span 3', compressor: '5 / span 3' },
      channel: {
        pan: 0,
        volume: 90,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          pitchDecay: 0.01,
          octaves: 6,
          oscillator: {
            type: 'square4'
          },
          envelope: {
            attack: 0.001,
            decay: 0.45,
            sustain: 0.1,
            release: 0.3
          }
        },
        effects: {
          Gain: { gain: 2 },
          EQ3: { low: 75, mid: 8, high: 8 },
          Compressor: {
            threshold: -30,
            ratio: 6,
            attack: 0.0001,
            release: 0.1
          }
        }
      }
    },
    'track-b': {
      id: 'track-b',
      synth: 'MetalSynth',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      effects: { equaliser: '1 / span 3', effects: '5 / span 3' },
      channel: {
        pan: 0.7,
        volume: 90,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          harmonicity: 12,
          resonance: 1000,
          modulationIndex: 20,
          volume: -15,
          envelope: {
            attack: 2.0,
            decay: 0.4,
            sustain: 0.512,
            release: 0.067
          }
        },
        effects: {
          Gain: { gain: 2 },
          EQ3: { low: 75, mid: 75, high: 75 },
          Distortion: { distortion: 1, oversample: '4x', wet: 0 },
          Reverb: { decay: 4, preDelay: 0.2, wet: 0 },
          FeedbackDelay: { delayTime: `${Math.floor(16 / 2)}n`, feedback: 1 / 3, wet: 0 }
        }
      }
    },
    'track-c': {
      id: 'track-c',
      synth: 'NoiseSynth',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      effects: { equaliser: '1 / span 3', filter: '5 / span 3' },
      channel: {
        pan: -0.5,
        volume: 82,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          volume: -8,
          noise: {
            type: 'white',
            playbackRate: 5
          },
          envelope: {
            attack: 0.001,
            decay: 0.3,
            sustain: 0,
            release: 0.3
          }
        },
        effects: { EQ3: { low: 0, mid: 18, high: 86 }, Filter: { Q: 2, frequency: 10000 } }
      }
    },
    'track-d': {
      id: 'track-d',
      synth: 'NoiseSynth',
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      effects: { equaliser: '1 / span 3', filter: '5 / span 3' },
      channel: {
        pan: 0.8,
        volume: 88,
        mute: false,
        solo: false
      },
      instrument: {
        synth: {
          volume: -14,
          envelope: {
            attack: 0.01,
            decay: 0.15,
            sustain: 0.0,
            release: 0.06
          }
        },
        effects: {
          Gain: { gain: 2 },
          EQ3: { low: 0, mid: 0, high: 82 },
          Filter: { Q: 2, frequency: 8000 }
        }
      }
    }
  }
);

export { master, tracks };
