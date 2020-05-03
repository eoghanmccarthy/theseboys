import React, { useContext } from 'react';

import { TrackContext } from '../trackProvider';

import * as styles from './styles';

import Step from '../step';

const Steps = () => {
  const { stepState, setStepState } = useContext(TrackContext);

  return (
    <div css={styles.steps}>
      <div css={styles.progressIndicator} />
      {stepState.map((value, i) => {
        return (
          <Step
            key={i}
            stepIndex={i}
            value={value}
            stepState={stepState}
            setStepState={setStepState}
          />
        );
      })}
    </div>
  );
};

export default Steps;
