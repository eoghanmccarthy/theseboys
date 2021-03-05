import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from 'app/reducers';

const persistConfig = {
  key: 'root',
  storage
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
