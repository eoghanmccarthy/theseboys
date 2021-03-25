import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { master, tracks } from './redux';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    master,
    tracks
  });

export default createRootReducer;
