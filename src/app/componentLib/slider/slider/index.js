import React from "react";

import "./styles.scss";

const Slider = ({ min, max, value, onChange }) => {
  return (
    <input
      type={"range"}
      min={min}
      max={max}
      value={value}
      className={"range"}
      onChange={onChange}
    />
  );
};

export default Slider;
