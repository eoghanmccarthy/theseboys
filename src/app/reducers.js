import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { songs } from './redux';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    songs
  });

export default createRootReducer;
