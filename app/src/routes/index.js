import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import Studio from '../pages/studio';
import { MasterProvider } from 'components/master';

const AppRoutes = () => (
  <div className={'me'}>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route
          exact
          path="studio"
          element={
            <MasterProvider>
              <Studio />
            </MasterProvider>
          }
        />
        <Route path={'*'} element={<Home />} />
      </Route>
    </Routes>
  </div>
);

export default AppRoutes;
