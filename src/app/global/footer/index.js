import React from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

import Logo from "componentLib/logo";

const Footer = () => {
  const auth = useSelector(state => state.app.authentication);

  return (
    <footer className={"me__footer"}>
      <Logo />
    </footer>
  );
};

export default Footer;
