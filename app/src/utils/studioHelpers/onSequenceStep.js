import { Draw } from 'tone';
import consoleLog from 'utils/errorHandlers/consoleLog';
import { isArray, isString, isNumber, isFunction, isUndefined } from 'utils/helpers/typeCheck';

import { drawSteps } from './drawSteps';
import { isStepOn } from './isStepOn';
import { random } from './random';

/**
 * @param {string} trackId
 * @param {array} notes
 * @param {number} numSteps
 * @param {number} time
 * @param {number} step
 * @param {function} onStepOn
 */
export const onSequenceStep = (trackId, notes = [], numSteps, time, step, onStepOn) => {
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

  const numRows = notes.length || 1;

  let notesToPlay = [];

  const velocity = step === 0 ? 1 : 0.75;
  // const velocity = random(0.5, 1);

  for (let row = 0; row < numRows; row++) {
    const sequencer = document.querySelector(`#${trackId} .step-sequencer`);
    if (isUndefined(sequencer)) {
      return;
    }

    const isRandom = sequencer.getAttribute('data-random') === 'on';
    const randomValue = sequencer.getAttribute('data-random-value');

    const isOn = isRandom ? random(0, 1) > parseFloat(randomValue) : isStepOn(trackId, row, step);

    if (isOn) {
      if (!notes.length) {
        onStepOn(undefined, velocity);
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
