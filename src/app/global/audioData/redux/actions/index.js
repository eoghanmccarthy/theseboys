import * as types from '../actionTypes';

export const saveSong = payload => {
  return {
    type: types.AUDIO_DATA_SAVE_SONG,
    payload
  };
};

export const loadSong = payload => {
  return {
    type: types.AUDIO_DATA_LOAD_SONG,
    payload
  };
};
