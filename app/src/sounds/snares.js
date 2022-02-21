//https://howtomakeelectronicmusic.com/eq-frequency-chart-for-electronic-music/#prettyPhoto/0/
//https://blog.landr.com/eq-kick-and-bass/
//https://github.com/Tonejs/Tone.js/issues/416

const sound = { notes: [], steps: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] };

export const tracks = {
  snare01: {
    id: 'snare01',
    type: 'snare',
    name: '',
    ...sound,
    notes: ['C1'],
    instrument: {
      synth: 'MetalSynth',
      options: {
        harmonicity: 12,
        resonance: 1000,
        modulationIndex: 20,
        volume: -15,
        envelope: {
          attack: 1.2,
          decay: 1,
          sustain: 0.0,
          release: 0.067
        }
      }
    },
    effects: new Map([
      ['Reverb', { decay: 4, preDelay: 0.2, wet: 0.22 }],
      [
        'FeedbackDelay',
        {
          delayTime: 0.25,
          feedback: 1 / 3,
          wet: 0.15,
          maxDelay: 1
        }
      ],
      ['Distortion', { distortion: 1, oversample: '4x', wet: 0.12 }],
      ['Gain', { gain: 2 }],
      [
        'EQ3',
        {
          low: -48,
          mid: -6,
          high: -6,
          lowFrequency: 800,
          highFrequency: 1600
        }
      ]
    ]),
    controls: {
      equaliser: { span: '1 / span 5', effects: ['EQ3'] },
      effects: {
        span: '6 / span 3',
        effects: ['Distortion', 'Reverb', 'FeedbackDelay']
      }
    }
  },
  snare02: {
    id: 'snare02',
    type: 'snare',
    name: '',
    ...sound,
    notes: ['C1'],
    instrument: {
      synth: 'MetalSynth',
      options: {
        harmonicity: 12,
        resonance: 1000,
        modulationIndex: 20,
        volume: -15,
        envelope: {
          attack: 1.2,
          decay: 1,
          sustain: 0.0,
          release: 0.067
        }
      }
    },
    effects: new Map([
      ['Reverb', { decay: 4, preDelay: 0.2, wet: 0.8 }],
      [
        'FeedbackDelay',
        {
          delayTime: 0.25,
          feedback: 1 / 3,
          wet: 0.5,
          maxDelay: 1
        }
      ],
      ['BitCrusher', { wet: 0.6, bits: 10 }],
      ['Distortion', { distortion: 1, oversample: '4x', wet: 0.68 }],
      ['Gain', { gain: 2 }],
      ['PitchShift', { wet: 0.8, pitch: 0 }],
      ['StereoWidener', { wet: 0.8, width: 1 }],
      [
        'EQ3',
        {
          low: -48,
          mid: 0,
          high: -12,
          lowFrequency: 1200,
          highFrequency: 2400
        }
      ]
    ]),
    controls: {
      equaliser: { span: '1 / span 5', effects: ['EQ3'] },
      effects: {
        span: '6 / span 6',
        effects: [
          'Distortion',
          'Reverb',
          'FeedbackDelay',
          'PitchShift',
          'StereoWidener',
          'BitCrusher'
        ]
      }
    }
  }
};
