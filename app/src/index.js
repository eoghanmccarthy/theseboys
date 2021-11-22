import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Studio from './pages/studio';
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
      <Route path={'*'} element={<Home />} />
    </Routes>
  </div>
);

export default App;
