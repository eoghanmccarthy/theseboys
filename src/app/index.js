import React, { useState, useLayoutEffect } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router";
import "./styles.css";

import { fetchAuthConfig } from "authentication/redux";

import Routes from "routes";

const App = ({ fetchAuthConfig }) => {
  const auth = useSelector(state => state.app.authentication);
  const [appReady, setAppReady] = useState(false);

  useLayoutEffect(() => {
    _bootstrapAsync();
  }, [auth.isLoaded]);

  const _bootstrapAsync = async () => {
    auth.isLoaded ? setAppReady(true) : fetchAuthConfig();
  };

  return !appReady ? null : <Routes />;
};

export default withRouter(connect(null, { fetchAuthConfig })(App));
