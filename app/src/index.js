import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './styles.css';

import Home from './pages/home';
import Studio from './pages/studio';
import Box from './pages/box';
import Oscillator from './pages/oscillator';
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
        path="/studio/box"
        element={
          <MasterProvider>
            <Box />
          </MasterProvider>
        }
      />
      <Route
        exact
        path="/studio/oscillator"
        element={
          <MasterProvider>
            <Oscillator />
          </MasterProvider>
        }
      />
      <Route path={'*'} element={<Home />} />
    </Routes>
  </div>
);

export default App;
