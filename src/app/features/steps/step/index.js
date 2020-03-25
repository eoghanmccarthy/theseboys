import React from "react";

import "./styles.scss";

const Step = ({ index, currentStep, step, stepState, setStepState, track }) => {
  return (
    <button
      className={"step"}
      style={{
        backgroundColor: `${
          step === 1 ? "red" : step === 2 ? "green" : "white"
        }`,
        opacity: `${index === currentStep ? 0.5 : 1}`
      }}
      onClick={e => {
        e.preventDefault();
        let shiftEnabled = e.shiftKey === true;
        let steps = [...stepState[track]];
        let val =
          steps[index] === 0
            ? shiftEnabled
              ? 2
              : 1
            : steps[index] === 1 && shiftEnabled
            ? 2
            : steps[index] === 2 && shiftEnabled
            ? 1
            : 0;
        steps[index] = val;
        setStepState({
          ...stepState,
          [track]: steps
        });
      }}
    />
  );
};

export default Step;
