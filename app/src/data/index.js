export const scales = {
  A_MAJOR: ['A3', 'B3', 'D4', 'E4', 'F#4', 'A4', 'B4', 'D5'],
  A_MINOR: ['A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5', 'D5'],
  C_MAJOR: ['C4', 'D4', 'F4', 'G4', 'A4', 'C5', 'D5', 'F5'],
  G_MAJOR: ['G3', 'A3', 'C4', 'D4', 'E4', 'G4', 'A4', 'C5']
};

console.log(scales.A_MINOR.slice(0, 6));

export const polySynthSamples = [
  {
    channel: {
      pan: 0,
      volume: 4,
      mute: false
    },
    stepCount: 16,
    notes: scales.A_MINOR.slice(0, 6),
    steps: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    instrument: { synth: '', options: {} },
    effects: {
      EQ3: {
        low: 12,
        mid: 0,
        high: -6,
        lowFrequency: 600,
        highFrequency: 920
      },
      Distortion: { distortion: 0.6, oversample: '4x', wet: 0.0 },
      Phaser: { frequency: 15, octaves: 5, stages: 10, Q: 10, baseFrequency: 100, wet: 0.0 }
    },
    controls: {
      eq3: { span: '1 / span 5', effects: ['EQ3'] },
      effects: { span: '6 / span 1', effects: ['Distortion'] },
      phaser: { span: '7 / span 3', effects: ['Phaser'] }
    }
  }
];
