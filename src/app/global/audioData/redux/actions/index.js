import * as types from '../actionTypes';

export const saveTrack = payload => {
  return {
    type: types.AUDIO_DATA_SAVE_TRACK,
    payload
  };
};

export const loadTrack = payload => {
  return {
    type: types.AUDIO_DATA_LOAD_TRACK,
    payload
  };
};
