import React from 'react';
import { withRouter } from 'react-router-dom';

import './styles.css';

import { useGetAuth } from './utils/api';

import Routes from './routes';

const App = () => {
  const auth = useGetAuth({ enabled: window.location.hostname !== 'localhost' });
  return window.location.hostname === 'localhost' || auth.isSuccess ? <Routes /> : null;
};

export default withRouter(App);
