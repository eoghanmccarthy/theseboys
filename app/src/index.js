import React from 'react';
import { withRouter } from 'react-router-dom';

import './styles.css';

import { useGetAuth } from './utils/api';

import Routes from 'routes';

const App = () => {
  const auth = useGetAuth(
    { instance: 'app-root' },
    { enabled: window.location.hostname !== 'localhost', cacheTime: 0 }
  );
  return window.location.hostname === 'localhost' || auth.isSuccess ? <Routes /> : null;
};

export default withRouter(App);
