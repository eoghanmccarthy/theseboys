import produce from 'immer';

import * as types from '../actionTypes';

const initialState = {};

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.AUDIO_DATA_SAVE_SONG:
        draft.isFetching = true;
        draft.error = '';
        return;
      case types.AUDIO_DATA_LOAD_SONG:
        draft.isFetching = false;
        draft.isLoaded = true;
        draft.data = action.payload;
        return;
    }
  });

export default reducer;
