const CHANNEL = {
  pan: 0,
  volume: 4,
  mute: false
};

const STEP_COUNT = 16;

const STEPS = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

const INSTRUMENTS = {
  i001: {
    id: 'i001',
    name: 'KICK',
    notes: ['G1'],
    instrument: 'MembraneSynth',
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
      Reverb: { decay: 0.2, preDelay: 0.2, wet: 0.05 },
      Distortion: { distortion: 0.6, oversample: '4x', wet: 0.22 },
      Compressor: {
        threshold: -26,
        knee: 20,
        ratio: 4.2,
        attack: 0.024,
        release: 0.132
      },
      Limiter: { threshold: -32 },
      EQ3: {
        Q: 10,
        low: 0,
        mid: -60,
        high: -60,
        lowFrequency: 120,
        highFrequency: 160
      },
      Filter: { frequency: 120, type: 'lowpass' }
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      compressor: { span: '4 / span 4', effects: ['Compressor'] },
      limiter: { span: '8 / span 1', effects: ['Limiter'] },
      effects: {
        span: '9 / span 2',
        effects: ['Distortion', 'Reverb']
      }
    }
  },
  i002: {
    id: 'i002',
    name: 'KICK',
    notes: ['G1'],
    instrument: 'MembraneSynth',
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
      Compressor: {
        threshold: -26,
        knee: 20,
        ratio: 4.2,
        attack: 0.024,
        release: 0.132
      },
      Limiter: { threshold: -4 },
      EQ3: {
        Q: 10,
        low: 0,
        mid: -56,
        high: -56,
        lowFrequency: 320,
        highFrequency: 400
      },
      Filter: { frequency: 320, type: 'bandpass' }
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      compressor: { span: '4 / span 4', effects: ['Compressor'] },
      limiter: { span: '8 / span 1', effects: ['Limiter'] }
    }
  },
  i003: {
    id: 'i003',
    name: '',
    notes: ['C1'],
    instrument: 'MetalSynth',
    synth: {
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
    },
    effects: {
      BitCrusher: { wet: 0.6, bits: 10 },
      Distortion: { distortion: 1, oversample: '4x', wet: 0.68 },
      FeedbackDelay: {
        delayTime: 0.25,
        feedback: 1 / 3,
        wet: 0.5,
        maxDelay: 1
      },
      Gain: { gain: 2 },
      PitchShift: { wet: 0.8, pitch: 0 },
      Reverb: { decay: 4, preDelay: 0.2, wet: 0.45 },
      StereoWidener: { wet: 0.8, width: 1 },
      EQ3: {
        high: -20.0,
        highFrequency: 2500,
        low: 12.0,
        lowFrequency: 400,
        mid: 0
      }
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      effects: {
        span: '5 / span 6',
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
  },
  i004: {
    id: 'i004',
    name: '',
    instrument: 'NoiseSynth',
    synth: {
      volume: -8,
      noise: {
        type: 'white',
        playbackRate: 5
      },
      envelope: {
        attack: 0.001,
        decay: 0.222,
        sustain: 0.26,
        release: 0.188
      }
    },
    effects: {
      Filter: { Q: 1, detune: 0, frequency: 12000, gain: 0, rolloff: -48, type: 'highpass' },
      EQ3: {
        high: 8.799999999999995,
        highFrequency: 2500,
        low: -60,
        lowFrequency: 400,
        mid: -60
      }
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      filter: { span: '5 / span 2', effects: ['Filter'] }
    }
  },
  i005: {
    id: 'i005',
    name: '',
    instrument: 'NoiseSynth',
    synth: {
      volume: -8,
      noise: {
        type: 'white',
        playbackRate: 5
      },
      envelope: {
        attack: 0.001,
        decay: 0.3,
        sustain: 0.002,
        release: 0.32
      }
    },
    effects: {
      Filter: { Q: 1, detune: 0, frequency: 11200, gain: 0, rolloff: -48, type: 'highpass' },
      Reverb: { decay: 4, preDelay: 0.2, wet: 0.28 },
      EQ3: {
        high: 8.799999999999995,
        highFrequency: 2500,
        low: -60,
        lowFrequency: 400,
        mid: -60
      }
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      filter: { span: '5 / span 2', effects: ['Filter'] }
    }
  }
};

export { CHANNEL, INSTRUMENTS, STEP_COUNT, STEPS };
