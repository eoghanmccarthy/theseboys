import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import master from './features/redux';

const appReducer = combineReducers({
  master
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`);
    });

    state = {};
  }
  return appReducer(state, action);
};

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    app: rootReducer
  });

export default createRootReducer;
