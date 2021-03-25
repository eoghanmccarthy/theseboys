import produce from 'immer';

const initialState = { volume: 0, bpm: 120 };

const master = produce((draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'store/RESET':
      return initialState;
    case 'master/SAVE':
      return payload;
  }
}, initialState);

export default master;
