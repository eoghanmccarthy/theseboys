const initialState = [
  {
    steps: [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    instrument: 1000,
    note: 'a2',
    channel: {
      volume: 80,
      pan: -0.2,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0.4 },
      autoFilter: {
        baseFrequency: 200,
        wet: 0.4
      },
      feedbackDelay: {
        delayTime: 0.6,
        feedback: 0.5,
        wet: 0.4
      }
    }
  },
  {
    steps: [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    instrument: 1001,
    note: 'c3',
    channel: {
      volume: 72,
      pan: 0.8,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0.4 },
      distortion: {
        distortion: 0.2,
        oversample: '2x',
        wet: 0.3
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
    instrument: 1002,
    note: 'c3',
    channel: {
      volume: 86,
      pan: 0,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 1 },
      autoFilter: {
        baseFrequency: 200,
        wet: 0.0
      },
      feedbackDelay: {
        delayTime: 0.8,
        feedback: 0.5,
        wet: 0.6
      }
    }
  },
  {
    steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    instrument: 1003,
    note: 'c2',
    channel: {
      volume: 88,
      pan: 0,
      mute: false,
      solo: false
    },
    effects: {
      filter: {}
      // autoFilter: {
      //   baseFrequency: 200,
      //   wet: 0.2
      // }
    }
  }
];

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
