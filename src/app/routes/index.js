import React from "react";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";

import Footer from "global/footer";
import Home from "../pages";

const Routes = ({ location }) => (
  <div className={"me"}>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route render={() => <Home />} />
    </Switch>
    <Footer />
  </div>
);

export default withRouter(Routes);
