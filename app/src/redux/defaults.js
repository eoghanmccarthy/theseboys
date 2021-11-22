//https://howtomakeelectronicmusic.com/eq-frequency-chart-for-electronic-music/#prettyPhoto/0/
//https://blog.landr.com/eq-kick-and-bass/
//https://github.com/Tonejs/Tone.js/issues/416

export const INSTRUMENTS = {
  i001: {
    id: 'i001',
    name: 'SUB KICK',
    notes: ['G1'],
    instrument: {
      synth: 'MembraneSynth',
      options: {
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
      Limiter: { threshold: -48 },
      EQ3: {
        Q: 1,
        low: -3,
        mid: -48,
        high: -60,
        lowFrequency: 100,
        highFrequency: 120
      }
    },
    controls: {
      equaliser: { span: '1 / span 5', effects: ['EQ3'] },
      compressor: { span: '6 / span 4', effects: ['Compressor'] },
      limiter: { span: '10 / span 1', effects: ['Limiter'] },
      effects: {
        span: '11 / span 2',
        effects: []
        //effects: ['Distortion', 'Reverb']
      }
    }
  },
  i002: {
    id: 'i002',
    name: 'MID KICK',
    notes: ['C1'],
    instrument: {
      synth: 'MembraneSynth',
      options: {
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
      }
    },
    effects: {
      Compressor: {
        threshold: -21,
        knee: 20,
        ratio: 4.2,
        attack: 0.024,
        release: 0.132
      },
      Limiter: { threshold: -12 },
      EQ3: {
        Q: 1,
        low: -3,
        mid: -24,
        high: -60,
        lowFrequency: 160,
        highFrequency: 420
      }
    },
    controls: {
      eq3: { span: '1 / span 5', effects: ['EQ3'] },
      compressor: { span: '6 / span 4', effects: ['Compressor'] },
      limiter: { span: '10 / span 1', effects: ['Limiter'] }
    }
  },
  i003: {
    id: 'i003',
    name: '',
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
    effects: {
      Reverb: { decay: 4, preDelay: 0.2, wet: 0.22 },
      FeedbackDelay: {
        delayTime: 0.25,
        feedback: 1 / 3,
        wet: 0.15,
        maxDelay: 1
      },
      Distortion: { distortion: 1, oversample: '4x', wet: 0.12 },
      Gain: { gain: 2 },
      EQ3: {
        low: -48,
        mid: -6,
        high: -6,
        lowFrequency: 800,
        highFrequency: 1600
      }
    },
    controls: {
      equaliser: { span: '1 / span 5', effects: ['EQ3'] },
      effects: {
        span: '6 / span 3',
        effects: ['Distortion', 'Reverb', 'FeedbackDelay']
      }
    }
  },
  i004: {
    id: 'i004',
    name: '',
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
    effects: {
      Reverb: { decay: 4, preDelay: 0.2, wet: 0.8 },
      FeedbackDelay: {
        delayTime: 0.25,
        feedback: 1 / 3,
        wet: 0.5,
        maxDelay: 1
      },
      BitCrusher: { wet: 0.6, bits: 10 },
      Distortion: { distortion: 1, oversample: '4x', wet: 0.68 },
      Gain: { gain: 2 },
      PitchShift: { wet: 0.8, pitch: 0 },
      StereoWidener: { wet: 0.8, width: 1 },
      EQ3: {
        low: -48,
        mid: 0,
        high: -12,
        lowFrequency: 1200,
        highFrequency: 2400
      }
    },
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
  },
  i005: {
    id: 'i005',
    name: '',
    notes: [],
    steps: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]],
    instrument: {
      synth: 'NoiseSynth',
      options: {
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
      }
    },
    effects: {
      Filter: { Q: 1, detune: 0, frequency: 11600, gain: 0, rolloff: -48, type: 'bandpass' },
      EQ3: {
        low: -60,
        mid: 0,
        high: -6,
        lowFrequency: 6000,
        highFrequency: 12000
      }
    },
    controls: {
      equaliser: { span: '1 / span 5', effects: ['EQ3'] },
      filter: { span: '6 / span 1', effects: ['Filter'] }
    }
  },
  i006: {
    id: 'i006',
    name: '',
    notes: [],
    instrument: {
      synth: 'NoiseSynth',
      options: {
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
      }
    },
    effects: {
      Filter: { Q: 1, detune: 0, frequency: 3700, gain: 0, rolloff: -48, type: 'bandpass' },
      Reverb: { decay: 4, preDelay: 0.2, wet: 0.28 },
      EQ3: {
        low: -60,
        mid: 0,
        high: -6,
        lowFrequency: 9000,
        highFrequency: 16000
      }
    },
    controls: {
      equaliser: { span: '1 / span 5', effects: ['EQ3'] },
      filter: { span: '6 / span 1', effects: ['Filter'] }
    }
  }
};
