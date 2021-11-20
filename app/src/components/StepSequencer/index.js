import React, { memo } from 'react';
import { isArray, isString, isNumber } from 'utils/helpers/typeCheck';

import './styles.css';

import Step from './Step';

const StepSequencer = memo(({ trackId, numberOfSteps = 16, initialValue }) => {
  if (!isString(trackId) || !isNumber(numberOfSteps) || !isArray(initialValue)) {
    return null;
  }

  return (
    <div className={`step-sequencer`} data-random={'off'} data-random-value={'0.80'}>
      {initialValue.map((rowData, rowIndex) => {
        if (!isArray(rowData)) {
          return null;
        }

        return (
          <div
            key={rowIndex}
            style={{ gridTemplateColumns: `repeat(${numberOfSteps},1fr)` }}
            className={`steps ${trackId}-steps-${rowIndex}`}
          >
            {rowData.map((stepValue, stepIndex) => {
              return (
                <Step
                  key={stepIndex}
                  trackId={trackId}
                  stepValue={stepValue}
                  rowIndex={rowIndex}
                  stepIndex={stepIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

export default StepSequencer;
