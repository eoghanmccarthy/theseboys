import React from "react";

import "./styles.scss";

import StepSequencer from "features/stepSequencer";
import Oscillator from "features/oscillator";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const ModuleContainer = ({ index, data }) => {
  return (
    <div
      style={{ transform: `translateX(${index * 100}%)` }}
      className={"module"}
    >
      <div className={"module__head"}>
        <h1>
          <em>{alphabet.charAt(index)}/ </em>
          {data.name}
        </h1>
      </div>
      <div className={"module__main"}>
        {data.id === "seq" ? (
          <StepSequencer />
        ) : data.id === "osc" ? (
          <Oscillator />
        ) : null}
      </div>
    </div>
  );
};

export default ModuleContainer;
