import produce from 'immer';

//delayTime: `${Math.floor(16 / 2)}n`,

const initialState = {
  s001: { id: 's001' },
  s002: { id: 's002' },
  s003: { id: 's003' },
  s004: { id: 's004' }
};

const songs = produce((draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'store/RESET':
      return initialState;
    case 'song/SAVE_MASTER':
      draft[payload.songId] = { ...draft[payload.songId], master: payload.data };
      break;
    case 'song/SAVE_TRACK':
      const effects = {};
      payload.data.effects.forEach(item => {
        effects[item.name] = item.get();
      });
      draft[payload.songId] = {
        ...draft[payload.songId],
        tracks: { ...draft[payload.songId].tracks, [payload.trackId]: { ...payload.data, effects } }
      };
      break;
  }
}, initialState);

export default songs;
