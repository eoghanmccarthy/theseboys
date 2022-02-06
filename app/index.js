import React from 'react';
import { render } from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from '@eoghanmccarthy/ui';

import configureStore from './store/configureStore';

import App from './src';

import './index.css';

const initialState = {};

const { store, persistor } = configureStore(initialState);

const MOUNT_NODE = document.getElementById('root');

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store} context={ReactReduxContext}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
  MOUNT_NODE
);
