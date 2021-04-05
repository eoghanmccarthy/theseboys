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
    name: '',
    notes: ['C1'],
    instrument: 'MembraneSynth',
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
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      compressor: { span: '5 / span 3', effects: ['Compressor'] }
    }
  },
  i002: {
    id: 'i002',
    name: '',
    notes: ['C1'],
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
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      compressor: { span: '5 / span 3', effects: ['Compressor'] }
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
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      effects: { span: '5 / span 3', effects: ['Distortion', 'Reverb', 'FeedbackDelay'] }
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
        decay: 0.12,
        sustain: 0,
        release: 0
      }
    },
    effects: {
      EQ3: {
        high: 8.799999999999995,
        highFrequency: 2500,
        low: -60,
        lowFrequency: 400,
        mid: -60
      },
      Filter: { Q: 1, detune: 0, frequency: 12000, gain: 0, rolloff: -48, type: 'lowpass' }
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
      EQ3: {
        high: 8.799999999999995,
        highFrequency: 2500,
        low: -60,
        lowFrequency: 400,
        mid: -60
      },
      Filter: { Q: 1, detune: 0, frequency: 11200, gain: 0, rolloff: -48, type: 'lowpass' },
      Reverb: { decay: 4, preDelay: 0.2, wet: 0.28 }
    },
    controls: {
      equaliser: { span: '1 / span 3', effects: ['EQ3'] },
      filter: { span: '5 / span 2', effects: ['Filter'] }
    }
  }
};

export { CHANNEL, INSTRUMENTS, STEP_COUNT, STEPS };
