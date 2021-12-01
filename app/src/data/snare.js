import {
  SCALE_A_MAJOR,
  SCALE_A_MINOR,
  SCALE_C_MAJOR,
  SCALE_G_MAJOR,
  STEPS_DEFAULT,
  STEP_COUNT_DEFAULT
} from '../utils/constants';

const polySynthMelodies = [
  {
    notes: SCALE_A_MINOR.slice(0, 6),
    description: 'first',
    steps: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0]
    ]
  },
  {
    notes: SCALE_A_MINOR.slice(0, 6),
    description: 'interesting distinction between low and high parts',
    steps: [
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]
    ]
  },
  {
    notes: SCALE_A_MINOR.slice(0, 6),
    description: "haruna's first",
    steps: [
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    ]
  }
];

export const polySynthSamples = [
  {
    channel: {
      pan: 0.0,
      volume: 0,
      mute: false
    },
    stepCount: 16,
    notes: polySynthMelodies[2].notes,
    steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    instrument: [
      {
        synth: 'PolySynth',
        options: {
          polyphony: 6,
          volume: -10,
          oscillator: {
            partials: [0, 2, 3, 4]
          },
          envelope: {
            attack: 0.001,
            decay: 0.17,
            sustain: 0,
            release: 0.05
          }
        }
      },
      {
        synth: 'NoiseSynth',
        options: {
          volume: -12,
          noise: {
            type: 'pink',
            playbackRate: 3
          },
          envelope: {
            attack: 0.001,
            decay: 0.13,
            sustain: 0,
            release: 0.03
          }
        }
      }
    ],
    effects: {
      Filter: { frequency: 11000 }
    },
    controls: {
      filter: { span: '1 / span 5', effects: ['Filter'] }
    }
  }
];
