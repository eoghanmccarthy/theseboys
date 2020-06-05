const initialState = [
  {
    steps: [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    instrument: 1000,
    note: 'a2',
    duration: '8n',
    triggers: ['a2', '8n'],
    channel: {
      volume: 80,
      pan: -0.6,
      mute: true,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0.4 },
      feedbackDelay: {
        delayTime: 0.6,
        feedback: 0.5,
        wet: 0.4
      },
      distortion: {
        distortion: 0.2,
        oversample: '2x',
        wet: 0.0
      },
      eq3: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500
      }
    }
  },
  {
    steps: [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0],
    instrument: 1001,
    note: 'c2',
    duration: '8n',
    triggers: ['c2', '8n'],
    channel: {
      volume: 68,
      pan: 0.8,
      mute: true,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0.2 },
      feedbackDelay: {
        delayTime: 0.3,
        feedback: 0.5,
        wet: 0.2
      },
      distortion: {
        distortion: 0.2,
        oversample: '2x',
        wet: 0.2
      },
      eq3: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500
      }
    }
  },
  {
    steps: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    instrument: 1002,
    note: 'c3',
    duration: '8n',
    triggers: ['c3', '8n'],
    channel: {
      volume: 86,
      pan: 0.4,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 1 },
      feedbackDelay: {
        delayTime: 0.8,
        feedback: 0.5,
        wet: 0.6
      },
      distortion: {
        distortion: 1,
        oversample: '2x',
        wet: 1
      },
      eq3: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500
      }
    }
  },
  {
    steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    instrument: 1003,
    note: 'c2',
    duration: '8n',
    triggers: ['c2', '8n'],
    channel: {
      volume: 88,
      pan: 0,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 0 },
      feedbackDelay: {
        delayTime: 0.8,
        feedback: 0.5,
        wet: 0.0
      },
      distortion: {
        distortion: 1,
        oversample: '2x',
        wet: 0.0
      },
      eq3: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500
      }
    }
  },
  {
    steps: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    instrument: 1004,
    note: '',
    duration: '16n',
    triggers: ['32n'],
    channel: {
      volume: 88,
      pan: 0.5,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 1 },
      feedbackDelay: {
        delayTime: 0.8,
        feedback: 0.5,
        wet: 0.0
      },
      distortion: {
        distortion: 0.2,
        oversample: '2x',
        wet: 0.0
      },
      eq3: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500
      },
      phaser: {
        frequency: 0.5,
        octaves: 3,
        stages: 10,
        Q: 10,
        baseFrequency: 350,
        wet: 1
      },
      filter: { frequency: 9000 }
    }
  },
  {
    steps: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    instrument: 1005,
    note: 'e1',
    duration: '8n',
    triggers: ['e1', '8n'],
    channel: {
      volume: 70,
      pan: -0.7,
      mute: false,
      solo: false
    },
    effects: {
      reverb: { decay: 1.5, preDelay: 0.01, wet: 1 },
      feedbackDelay: {
        delayTime: 0.8,
        feedback: 0.5,
        wet: 0.6
      },
      distortion: {
        distortion: 0.2,
        oversample: '2x',
        wet: 0
      },
      eq3: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500
      }
    }
  }
];

function reducer(draft, action) {
  const { type, payload } = action;

  switch (type) {
    case 'channel/MUTE':
      draft[payload.trackIndex].channel.mute = !draft[payload.trackIndex].channel.mute;
      break;
    case 'channel/PAN':
      draft[payload.trackIndex].channel.pan = payload.value;
      break;
    case 'step':
      draft[payload.trackIndex].steps[payload.stepIndex] = payload.value;
      break;
    case 'effect':
      draft[payload.trackIndex].effects[payload.effect][payload.param] = payload.value;
      break;
    default:
      return draft;
  }
}

export { initialState, reducer };
