import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from '@eoghanmccarthy/ui';

import configureStore from './store/configureStore';

import App from './src';

import './styles.css';

const initialState = {};

const history = createHistory();

const { store, persistor } = configureStore(initialState, history);

const MOUNT_NODE = document.getElementById('root');

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store} context={ReactReduxContext}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
  MOUNT_NODE
);
