import { createStore, applyMiddleware, compose } from 'redux';
import { createMigrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from '../src/reducers';
import migrations from './migrations';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
  version: 0,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: false })
};

export default (initialState = {}, history) => {
  const middlewares = [routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    undefined,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
