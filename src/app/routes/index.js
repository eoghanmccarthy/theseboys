import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Studio from '../pages/studio';

const Routes = () => (
  <div className={'me'}>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/studio" render={() => <Studio />} />
      <Route render={() => <Home />} />
    </Switch>
  </div>
);

export default withRouter(Routes);
