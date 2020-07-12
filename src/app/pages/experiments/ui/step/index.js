import React, { memo } from 'react';
import classNames from 'classnames';

import './styles.css';

const Step = memo(({ sequencerName, trackIndex, stepIndex }) => {
  return (
    <div
      key={stepIndex}
      className={classNames(
        `step-seq__step`,
        `${sequencerName}__step`,
        `track-${trackIndex}-step-${stepIndex}`
      )}
      onClick={() => {
        const elem = document.querySelector(
          `.${sequencerName}__step.track-${trackIndex}-step-${stepIndex}`
        );
        if (!elem.classList.contains('on')) {
          elem.classList.add('on');
        } else {
          elem.classList.remove('on');
        }
      }}
    />
  );
});

export default Step;
