import React, { memo } from 'react';

import './styles.css';

import Step from '../step';

const Steps = memo(({ trackId, steps }) => {
  if (!trackId || !Array.isArray(steps)) {
    return null;
  }

  return (
    <div className={`step-sequencer`}>
      {steps.map((rowData, rowIndex) => {
        if (!Array.isArray(rowData)) {
          return null;
        }

        return (
          <div key={rowIndex} className={`steps-row`}>
            {rowData.map((stepValue, stepIndex) => {
              return (
                <Step key={stepIndex} trackId={trackId} rowIndex={rowIndex} stepIndex={stepIndex} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export default Steps;
