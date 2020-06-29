import React, { memo } from 'react';
import classNames from 'classnames';

const Step = memo(({ stepValue, onClick }) => {
  return (
    <span
      className={classNames(`step-sequencer__step`, {
        on: stepValue === 1
      })}
      onClick={onClick}
    />
  );
});

export default Step;
