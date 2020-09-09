import React from 'react';
import { withRouter } from 'react-router';

import './styles.css';

import { useGetAuth } from './utils/api';

import Routes from 'routes';

const App = () => {
  const auth = useGetAuth({ instance: 'app-root' }, { cacheTime: 0 });

  return !auth.isSuccess ? null : <Routes />;
};

export default withRouter(App);
