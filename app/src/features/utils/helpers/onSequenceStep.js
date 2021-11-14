import { Draw } from 'tone';
import consoleLog from 'utils/errorHandlers/consoleLog';
import { isArray, isString, isNumber, isFunction } from 'utils/helpers/typeCheck';

import isStepOn from './isStepOn';
import drawSteps from './drawSteps';

/**
 * @param {string} trackId
 * @param {array} notes
 * @param {number} numSteps
 * @param {number} time
 * @param {number} step
 * @param {function} onStepOn
 */

const onSequenceStep = (trackId, notes = [], numSteps, time, step, onStepOn) => {
  const errorLog = (...args) => {
    consoleLog('onSequenceStep,', ...args);
  };

  if (
    !isString(trackId) ||
    !isArray(notes) ||
    !isNumber(numSteps) ||
    !isNumber(time) ||
    !isNumber(step) ||
    !isFunction(onStepOn)
  ) {
    errorLog('invalid args', trackId, notes, numSteps, time, step, onStepOn);
    return;
  }

  let numRows = notes.length || 1;

  let notesToPlay = [];

  const velocity = step === 0 ? 1 : 0.75;
  // const velocity = random(0.5, 1);

  for (let row = 0; row < numRows; row++) {
    if (isStepOn(trackId, row, step)) {
      if (numRows === 1) {
        onStepOn(null, velocity);
      } else {
        const note = notes[row];
        notesToPlay.push(note);
      }
    }
  }

  if (notesToPlay.length) {
    onStepOn(notesToPlay, velocity);
  }

  Draw.schedule(() => {
    drawSteps(trackId, numSteps, step);
  }, time);
};

export default onSequenceStep;
