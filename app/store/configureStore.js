import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import createRootReducer from '../src/reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
  version: 0,
  stateReconciler: autoMergeLevel2
};

export default (initialState = {}) => {
  const middlewares = [];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistReducer(persistConfig, createRootReducer()),
    undefined,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
