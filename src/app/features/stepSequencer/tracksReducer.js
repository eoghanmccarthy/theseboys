const tracksInitialState = [
  {
    steps: [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    instrument: 'fmsynth',
    channel: {
      volume: 60,
      pan: 0,
      mute: false,
      solo: false
    },
    effects: {
      reverb: {
        preDelay: 0.01,
        decay: 1.5,
        wet: 0.0
      },
      autoFilter: {
        frequency: 1,
        type: 'sine',
        depth: 1,
        baseFrequency: 200,
        octaves: 2.6,
        filter: {
          type: 'lowpass',
          rolloff: -12,
          Q: 1
        }
      }
    }
  },
  {
    steps: [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    instrument: 'membranesynth',
    channel: {
      volume: 60,
      pan: 0,
      mute: false,
      solo: false
    },
    effects: {
      reverb: {
        preDelay: 0.01,
        decay: 1.5,
        wet: 0.0
      },
      autoFilter: {
        frequency: 1,
        type: 'sine',
        depth: 1,
        baseFrequency: 200,
        octaves: 2.6,
        filter: {
          type: 'lowpass',
          rolloff: -12,
          Q: 1
        }
      }
    }
  },
  {
    steps: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    instrument: 'amsynth',
    channel: {
      volume: 60,
      pan: 0,
      mute: false,
      solo: false
    },
    effects: {
      reverb: {
        preDelay: 0.01,
        decay: 1.5,
        wet: 0.0
      },
      autoFilter: {
        frequency: 1,
        type: 'sine',
        depth: 1,
        baseFrequency: 200,
        octaves: 2.6,
        filter: {
          type: 'lowpass',
          rolloff: -12,
          Q: 1
        }
      }
    }
  }
];

function tracksReducer(draft, action) {
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

export { tracksInitialState, tracksReducer };
