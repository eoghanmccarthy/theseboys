import produce from 'immer';

export const MASTER_SAVE = 'master/SAVE';

const initialState = { bpm: 120, volume: 75 };

const master = (state = initialState, action) =>
  produce(state, draft => {
    const { type, payload } = action;
    switch (type) {
      case MASTER_SAVE:
        return payload;
    }
  });

export default master;
