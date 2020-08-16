import React, { memo } from 'react';
import classNames from 'classnames';

import './styles.css';

const Step = memo(({ trackId, trackIndex, stepIndex }) => {
  return (
    <div
      key={stepIndex}
      className={classNames(
        `step-seq__step`,
        `${trackId}__step`,
        `track-${trackIndex}-step-${stepIndex}`
      )}
      data-step-status={'off'}
      onClick={() => {
        const elem = document.querySelector(
          `.${trackId}__step.track-${trackIndex}-step-${stepIndex}`
        );
        if (elem.getAttribute('data-step-status') === 'off') {
          elem.setAttribute('data-step-status', 'on');
        } else {
          elem.setAttribute('data-step-status', 'off');
        }
      }}
    />
  );
});

export default Step;
