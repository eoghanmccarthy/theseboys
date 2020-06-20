import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Footer from 'global/footer';
import Home from '../pages';
import Experiments from '../pages/experiments';

const Routes = ({ location }) => (
  <div className={'me'}>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/experiments" render={() => <Experiments />} />
      <Route render={() => <Home />} />
    </Switch>
    <Footer />
  </div>
);

export default withRouter(Routes);
