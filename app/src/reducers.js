import { combineReducers } from 'redux';

import { songs } from './redux';

const createRootReducer = () =>
  combineReducers({
    songs
  });

export default createRootReducer;
