import React from "react";
import { withRouter } from "react-router";
import "./styles.scss";

import Logo from "componentLib/logo";

const Header = ({ location }) => {
  return <header className={"me__header"}>{/*<Logo />*/}</header>;
};

export default withRouter(Header);
