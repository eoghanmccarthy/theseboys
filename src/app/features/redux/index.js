import produce from 'immer';

export const MASTER_SAVE = 'master/SAVE';
export const TRACK_SAVE_CHANNEL = 'track/SAVE_CHANNEL';
export const TRACK_SAVE_STEPS = 'track/SAVE_STEPS';
export const TRACK_SAVE_INSTRUMENT = 'track/SAVE_INSTRUMENT';

const master = produce(
  (draft, action) => {
    const { type, payload } = action;
    switch (type) {
      case MASTER_SAVE:
        return payload;
    }
  },
  { volume: 75, bpm: 120 }
);

const tracks = produce((draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRACK_SAVE_CHANNEL:
      draft[payload.id] = { ...draft[payload.id], channel: payload.data };
      break;
    case TRACK_SAVE_STEPS:
      draft[payload.id] = { ...draft[payload.id], steps: payload.data };
      break;
    case TRACK_SAVE_INSTRUMENT:
      draft[payload.id] = { ...draft[payload.id], instrument: payload.data };
      break;
  }
}, {});

export { master, tracks };
