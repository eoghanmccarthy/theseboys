import React, { memo } from 'react';

import './styles.css';

import Step from '../step';

const Steps = memo(({ trackId, numberOfSteps = 16, initialValue }) => {
  if (!trackId || !Array.isArray(initialValue)) {
    return null;
  }

  return (
    <div className={`step-sequencer`}>
      {initialValue.map((rowData, rowIndex) => {
        if (!Array.isArray(rowData)) {
          return null;
        }

        return (
          <div
            key={rowIndex}
            style={{ gridTemplateColumns: `repeat(${numberOfSteps},1fr)` }}
            className={`StepsRow`}
          >
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
