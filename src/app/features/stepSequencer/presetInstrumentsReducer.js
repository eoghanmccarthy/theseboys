const initialState = {
  1000: {
    id: 1000,
    type: 'fmsynth',
    options: {
      envelope: {
        attack: 0.01,
        decay: 0.1,
        release: 0.4,
        sustain: 0.5
      },
      oscillator: {
        type: 'sawtooth8',
        partialCount: 0,
        phase: 135
      }
    }
  },
  1001: {
    id: 1001,
    type: 'membranesynth',
    options: {
      frequency: 200,
      envelope: {
        attack: 0.001,
        decay: 0.3,
        release: 0.8
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }
  },
  1002: {
    id: 1002,
    type: 'amsynth',
    options: {
      harmonicity: 3,
      detune: 0,
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.01,
        decay: 0.7,
        sustain: 0.9,
        release: 1
      },
      modulation: {
        type: 'square'
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5
      }
    }
  },
  1003: {
    id: 1003,
    type: 'membranesynth',
    options: {
      pitchDecay: 0.05,
      octaves: 6,
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
        attackCurve: 'exponential'
      },
      oscillator: {
        type: 'sine'
      }
    }
  }
};

function reducer(draft, action) {
  const { type, payload } = action;

  switch (type) {
    case 'envelope':
      draft[payload.instrumentId].options.envelope[payload.param] = payload.value;
      break;
    default:
      return draft;
  }
}

export { initialState, reducer };
