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
        decay: 1.4,
        release: 0.2
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
        decay: 0.01,
        sustain: 1,
        release: 0.5
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
  }
};

function reducer(draft, action) {
  const { type, payload } = action;

  switch (type) {
    case 'mute':
      draft[payload.trackIndex].channel.mute = !draft[payload.trackIndex].channel.mute;
      break;
    case 'step':
      draft[payload.trackIndex].steps[payload.stepIndex] = payload.value;
      break;
    case 'channel':
      draft[payload.trackIndex].channel[payload.param] = payload.value;
      break;
    case 'effect':
      draft[payload.trackIndex].effects[payload.effect][payload.param] = payload.value;
      break;
    default:
      return draft;
  }
}

export { initialState, reducer };
