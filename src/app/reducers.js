import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authentication from "authentication/redux";

import { RESET_STORE } from "authentication/redux";

const appReducer = combineReducers({
  authentication
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
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
