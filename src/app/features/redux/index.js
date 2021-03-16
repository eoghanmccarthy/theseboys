import produce from 'immer';

export const MASTER_SAVE = 'master/SAVE';
export const TRACK_SAVE_CHANNEL = 'track/SAVE_CHANNEL';
export const TRACK_SAVE_STEPS = 'track/SAVE_STEPS';
export const TRACK_SAVE_SYNTH = 'track/SAVE_SYNTH';
export const TRACK_SAVE_EFFECTS = 'track/SAVE_EFFECTS';

//delayTime: `${Math.floor(16 / 2)}n`,

const master = produce(
  (draft, action) => {
    const { type, payload } = action;
    switch (type) {
      case MASTER_SAVE:
        return payload;
    }
  },
  { volume: 0, bpm: 120 }
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
      case TRACK_SAVE_EFFECTS:
        const d = {};
        payload.data.forEach(item => {
          d[item.name] = item.get();
        });
        draft[payload.id] = {
          ...draft[payload.id],
          instrument: { ...draft[payload.id].instrument, effects: d }
        };
        break;
    }
  },
  {
    t001: {
      id: 't001',
      synth: 'MembraneSynth',
      notes: ['C1'],
      numSteps: 16,
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      controls: {
        equaliser: { span: '1 / span 3', effects: ['EQ3'] },
        compressor: { span: '5 / span 3', effects: ['Compressor'] }
      },
      channel: {
        pan: 0,
        volume: 4,
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
            attack: 0.3,
            decay: 0.45,
            sustain: 0.1,
            release: 0.3
          }
        },
        effects: {
          Gain: { gain: 2 },
          EQ3: {
            high: -53.599999999999994,
            highFrequency: 2500,
            low: -16.799999999999997,
            lowFrequency: 400,
            mid: -53.599999999999994
          },
          Compressor: {
            threshold: -30,
            ratio: 6,
            attack: 0.0001,
            release: 0.1
          }
        }
      }
    },
    t002: {
      id: 't002',
      synth: 'MembraneSynth',
      notes: ['C1'],
      numSteps: 16,
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      controls: {
        equaliser: { span: '1 / span 3', effects: ['EQ3'] },
        compressor: { span: '5 / span 3', effects: ['Compressor'] }
      },
      channel: {
        pan: 0,
        volume: 4,
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
          EQ3: {
            high: 4,
            highFrequency: 2500,
            low: 0,
            lowFrequency: 400,
            mid: -12
          },
          Compressor: {
            threshold: -30,
            ratio: 6,
            attack: 0.0001,
            release: 0.1
          }
        }
      }
    },
    t003: {
      id: 't003',
      synth: 'MetalSynth',
      notes: ['C1'],
      numSteps: 16,
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      controls: {
        equaliser: { span: '1 / span 3', effects: ['EQ3'] },
        effects: { span: '5 / span 3', effects: ['Distortion', 'Reverb', 'FeedbackDelay'] }
      },
      channel: {
        pan: 0.7,
        volume: 4,
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
          EQ3: {
            high: 7.200000000000003,
            highFrequency: 2500,
            low: -22.39999999999999,
            lowFrequency: 400,
            mid: 0
          },
          Distortion: { distortion: 1, oversample: '4x', wet: 0.09 },
          Reverb: { decay: 4, preDelay: 0.2, wet: 0.28 },
          FeedbackDelay: {
            delayTime: 0.25,
            feedback: 1 / 3,
            wet: 0.5,
            maxDelay: 1
          }
        }
      }
    },
    t004: {
      id: 't004',
      synth: 'NoiseSynth',
      numSteps: 16,
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      controls: {
        equaliser: { span: '1 / span 3', effects: ['EQ3'] },
        filter: { span: '5 / span 3', effects: ['Filter'] }
      },
      channel: {
        pan: -0.5,
        volume: 4,
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
        effects: {
          EQ3: {
            high: 8.799999999999995,
            highFrequency: 2500,
            low: -59.99999999999999,
            lowFrequency: 400,
            mid: -45.599999999999994
          },
          Filter: { Q: 2, detune: 0, frequency: 10000, gain: 0, rolloff: -12, type: 'lowpass' }
        }
      }
    },
    t005: {
      id: 't005',
      synth: 'NoiseSynth',
      numSteps: 16,
      steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      controls: {
        equaliser: { span: '1 / span 3', effects: ['EQ3'] },
        filter: { span: '5 / span 3', effects: ['Filter'] }
      },
      channel: {
        pan: 0.5,
        volume: 4,
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
        effects: {
          EQ3: {
            high: 8.799999999999995,
            highFrequency: 2500,
            low: -59.99999999999999,
            lowFrequency: 400,
            mid: -45.599999999999994
          },
          Filter: { Q: 2, detune: 0, frequency: 10000, gain: 0, rolloff: -12, type: 'lowpass' }
        }
      }
    }
  }
);

export { master, tracks };
