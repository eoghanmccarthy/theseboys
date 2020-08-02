import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

import createRootReducer from 'app/reducers';
import { rootEpic } from 'app/epics';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['']
};

const epicMiddleware = createEpicMiddleware({
  dependencies: { getJSON: ajax.getJSON }
});

export default (initialState = {}, history) => {
  const middlewares = [epicMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistReducer(persistConfig, createRootReducer(history)),
    undefined,
    composeEnhancers(...enhancers)
  );

  const persistor = persistStore(store);

  epicMiddleware.run(rootEpic);

  return { store, persistor };
};
