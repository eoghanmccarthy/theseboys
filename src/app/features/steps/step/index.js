import React from "react";

import "./styles.scss";

const Step = ({ index, value, stepState, setStepState, track }) => {
  return (
    <button
      className={`step`}
      style={{
        backgroundColor: `${
          value === 1 ? "red" : value === 2 ? "green" : "white"
        }`
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
