import React from "react";

import "./styles.scss";

import Slider from "../slider";

const SliderWithValues = ({ title, min, max, value, onChange }) => {
  return (
    <div className={"slider-with-values"}>
      <div className={"slider"}>
        <Slider min={min} max={max} value={value} onChange={onChange} />
      </div>
      <div className={"meta"}>
        <span className={"title"}>{title}</span>
        <span className={"value"}>{value}</span>
      </div>
    </div>
  );
};

export default SliderWithValues;
