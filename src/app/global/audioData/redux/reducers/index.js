import produce from 'immer';

import * as types from '../actionTypes';

const initialState = {};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.AUDIO_DATA_SAVE_TRACK:
        draft.isFetching = true;
        draft.error = '';
        return;
      case types.AUDIO_DATA_LOAD_TRACK:
        draft.isFetching = false;
        draft.isLoaded = true;
        draft.data = action.payload;
        return;
    }
  });

export default reducer;
