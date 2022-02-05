import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './styles.css';

import Home from './pages/home';
import Studio from './pages/studio';
import Beats from './pages/beats';
import { MasterProvider } from 'components/master';

const App = () => (
  <div className={'me'}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        exact
        path="/studio"
        element={
          <MasterProvider>
            <Studio />
          </MasterProvider>
        }
      />
      <Route
        exact
        path="/studio/beats"
        element={
          <MasterProvider>
            <Beats />
          </MasterProvider>
        }
      />
      <Route path={'*'} element={<Home />} />
    </Routes>
  </div>
);

export default App;
