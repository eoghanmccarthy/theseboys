import React from "react";
import cx from "classnames";

import "./styles.scss";

const Control = ({ children, size = "md" }) => {
  return <div className={cx("control", { [size]: size })}>{children}</div>;
};

export default Control;
