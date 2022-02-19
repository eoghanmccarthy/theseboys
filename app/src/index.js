import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './styles.css';

import { Footer } from 'components/layout';
import Home from './pages/home';
import Studio from './pages/studio';
import Box from './pages/box';
import Poly from './pages/poly';
import Oscillator from './pages/oscillator';
import { MasterProvider } from 'components/master';

const App = () => (
  <div className={'me'}>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="studio"
        element={
          <MasterProvider>
            <Studio />
          </MasterProvider>
        }
      />
      <Route path="studio/*" element={<StudioRoutes />} />
      <Route path={'*'} element={<Home />} />
    </Routes>
  </div>
);

const StudioRoutes = () => (
  <>
    <Routes>
      <Route
        exact
        path="box"
        element={
          <MasterProvider>
            <Box />
          </MasterProvider>
        }
      />
      <Route
        exact
        path="poly"
        element={
          <MasterProvider>
            <Poly />
          </MasterProvider>
        }
      />
      <Route
        exact
        path="oscillator"
        element={
          <MasterProvider>
            <Oscillator />
          </MasterProvider>
        }
      />
    </Routes>
    <Footer />
  </>
);

export default App;
