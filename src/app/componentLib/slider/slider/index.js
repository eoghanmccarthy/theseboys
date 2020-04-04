import React from "react";

import "./styles.scss";

const Slider = ({ min, max, step = 1, value, onChange }) => {
  return (
    <input
      type={"range"}
      min={min}
      max={max}
      step={step}
      value={value}
      className={"range"}
      onChange={onChange}
    />
  );
};

export default Slider;
