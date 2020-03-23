import React from "react";
import cx from "classnames";

import "./styles.scss";

import { Button } from "@eoghanmccarthy/ui";

export const Base = ({ children, className, size = "lg", onClick }) => {
  return (
    <Button
      size={size}
      shape={"circle"}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const Close = ({ className, size = "lg", onClick }) => {
  return (
    <Button
      size={size}
      shape={"circle"}
      className={cx("close", className)}
      onClick={onClick}
    >
      <span />
      <span />
    </Button>
  );
};
