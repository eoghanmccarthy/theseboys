import React from "react";
import cx from "classnames";

const Step = ({ index, value, stepState, setStepState }) => {
  return (
    <button
      className={cx("step", { on: value === 1, double: value === 2 })}
      onClick={e => {
        e.preventDefault();
        let shiftEnabled = e.shiftKey === true;
        let steps = stepState;
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
        setStepState(steps);
      }}
    />
  );
};

export default Step;
