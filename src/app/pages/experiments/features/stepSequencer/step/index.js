import React, { memo, useRef } from 'react';
import classNames from 'classnames';

const Step = memo(({ stepValue, onClick }) => {
  const stepRef = useRef(null);

  return (
    <div
      ref={stepRef}
      className={classNames(`synth-step-sequencer__step`, {
        on: stepValue === 1
      })}
      onClick={onClick}
    >
      <span />
      <span />
    </div>
  );
});

export default Step;
