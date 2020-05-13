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
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0.4 },
      autoFilter: {
        baseFrequency: 440
      },
      feedbackDelay: {
        delayTime: 0.6,
        feedback: 0.5,
        wet: 0.4
      }
    }
  },
  {
    steps: [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    instrument: 'membranesynth',
    channel: {
      volume: 60,
      pan: 0.8,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0.4 },
      distortion: {
        distortion: 0.2,
        oversample: '2x',
        wet: 0.9
      },
      feedbackDelay: {
        delayTime: 0.3,
        feedback: 0.5,
        wet: 0.2
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
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0.4 },
      autoFilter: {
        baseFrequency: 220
      },
      feedbackDelay: {
        delayTime: 0.8,
        feedback: 0.5,
        wet: 0.4
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
