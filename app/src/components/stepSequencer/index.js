import React, { memo, useEffect, useRef } from 'react';
import { Sequence } from 'tone';

import { isArray, isString, isNumber } from 'utils/typeCheck';

import './styles.css';

import { onSequenceStep, newArray } from './utils';

import Step from './step';

const StepSequencer = memo(({ trackId, notes, stepCount = 16, steps, onStep }) => {
  if (!isString(trackId) || !isNumber(stepCount) || !isArray(steps)) {
    return null;
  }

  const noteInterval = `${stepCount}n`;
  const noteIndices = newArray(stepCount);

  const handleOnSequenceStep = (time, column) => {
    onSequenceStep(trackId, notes, stepCount, time, column, (notesToPlay, velocity) =>
      onStep(notesToPlay, noteInterval, time, velocity)
    );
  };

  /* Sequencer */
  const sequenceRef = useRef(
    new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0)
  );

  useEffect(() => {
    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      id={`${trackId}-sequencer`}
      className={`sequencer`}
      data-random={'off'}
      data-random-value={'0.80'}
    >
      {steps.map((rowData, rowIndex) => {
        if (!isArray(rowData)) {
          return null;
        }

        return (
          <div
            key={rowIndex}
            style={{ gridTemplateColumns: `repeat(${stepCount},1fr)` }}
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
