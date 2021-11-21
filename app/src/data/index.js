const scales = {
  A_MAJOR: ['A3', 'B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'D5'],
  A_MINOR: ['A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5'],
  C_MAJOR: ['C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'],
  G_MAJOR: ['G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5']
};

const polySynthMelodies = [
  {
    notes: scales.A_MINOR.slice(0, 6),
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
    notes: scales.A_MINOR.slice(0, 6),
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
    notes: scales.A_MINOR.slice(0, 6),
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
      pan: 0.4,
      volume: 4,
      mute: false
    },
    stepCount: 16,
    notes: polySynthMelodies[2].notes,
    steps: polySynthMelodies[2].steps,
    instrument: {
      synth: 'PolySynth',
      options: {
        volume: -10,
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.3,
          release: 1.6
        },
        voice0: {
          oscillator: {
            type: 'triangle4'
          },
          volume: -30,
          envelope: {
            attack: 0.005,
            release: 0.05,
            sustain: 1
          }
        },
        voice1: {
          volume: -10,
          envelope: {
            attack: 0.005,
            release: 0.05,
            sustain: 1
          }
        }
      }
    },
    effects: {
      Reverb: { decay: 4, preDelay: 0.2, wet: 0.08 },
      EQ3: {
        low: 0,
        mid: -10,
        high: 4,
        lowFrequency: 1320,
        highFrequency: 5380
      },
      Distortion: { distortion: 0.6, oversample: '4x', wet: 0.72 },
      Phaser: { frequency: 15, octaves: 5, stages: 10, Q: 10, baseFrequency: 100, wet: 0.0 }
    },
    controls: {
      eq3: { span: '1 / span 5', effects: ['EQ3'] },
      effects: { span: '6 / span 2', effects: ['Distortion', 'Reverb'] },
      phaser: { span: '8 / span 3', effects: ['Phaser'] }
    }
  }
];
