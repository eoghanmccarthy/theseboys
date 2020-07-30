import React, { memo } from 'react';

import './styles.css';

import Step from '../step';

const Steps = memo(({ sequencer, steps }) => {
  if (!steps) return null;

  return (
    <div className={`exp step-seq__steps`}>
      {steps.map((rowData, trackIndex) => (
        <div key={trackIndex} className={`row`}>
          {rowData.map((stepValue, stepIndex) => (
            <Step
              key={stepIndex}
              sequencerName={sequencer}
              trackIndex={trackIndex}
              stepIndex={stepIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default Steps;
