import produce from 'immer';

//delayTime: `${Math.floor(16 / 2)}n`,

const initialState = {};

const tracks = produce((draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'store/RESET':
      return initialState;
    case 'track/SAVE_CHANNEL':
      draft[payload.id] = { ...draft[payload.id], channel: payload.data };
      break;
    case 'track/SAVE_STEPS':
      draft[payload.id] = { ...draft[payload.id], steps: payload.data };
      break;
    case 'track/SAVE_SYNTH':
      draft[payload.id] = { ...draft[payload.id], synth: payload.data };
      break;
    case 'track/SAVE_EFFECTS':
      const effects = {};
      payload.data.forEach(item => {
        effects[item.name] = item.get();
      });
      draft[payload.id] = { ...draft[payload.id], effects };
      break;
  }
}, initialState);

export default tracks;
