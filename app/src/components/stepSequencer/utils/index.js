import { Draw } from 'tone';
import consoleLog from 'utils/errorHandlers/consoleLog';
import { isArray, isString, isNumber, isFunction, isUndefined } from 'utils/typeCheck';

import { random } from 'utils/studioHelpers/random';
import { RANDOMIZER_MIN, RANDOMIZER_MAX } from 'utils/constants';
import { fromPercent, toPercent } from 'utils/studioHelpers';

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
    const sequencer = document.querySelector(`#${trackId}-sequencer`);
    if (isUndefined(sequencer)) {
      return;
    }

    const randomValue = sequencer.getAttribute('data-randomize');

    // Randomizes only steps whose value is on
    const isOn = isStepOn(trackId, row, step) && random(0, 1) >= parseInt(randomValue) / 100;

    // Ignores step value, each step is randomized
    // const isOn = randomValue > 0
    //   ? random(0, 1) > fromPercent([RANDOMIZER_MIN, RANDOMIZER_MAX], 100 - parseInt(randomValue))
    //   : isStepOn(trackId, row, step);

    // Only step value
    // const isOn = isStepOn(trackId, row, step)

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

/**
 * @param {string} trackId
 * @param {number} row
 * @param {number} step
 * @returns {boolean}
 */
const isStepOn = (trackId, row, step) => {
  const errorLog = (...args) => {
    consoleLog('isStepOn,', ...args);
  };

  if (!isString(trackId) || !isNumber(row) || !isNumber(step)) {
    errorLog('invalid args', trackId, row, step);
    return false;
  }

  const node = document.querySelector(`#${trackId}-sequencer .step.row-${row}-step-${step}`);

  if (isUndefined(node)) {
    errorLog('node undefined', node);
    return false;
  }

  const value = node.getAttribute('value');

  if (isUndefined(value)) {
    errorLog('value undefined', value);
    return false;
  }

  return value === 'on';
};

/**
 * @param {string} trackId
 * @param {number} stepTotal
 * @param {number} step
 */
const drawSteps = (trackId, stepTotal, step) => {
  const errorLog = (...args) => {
    consoleLog('drawSteps,', ...args);
  };

  if (!isString(trackId) || !isNumber(stepTotal) || !isNumber(step)) {
    errorLog('invalid args', trackId, stepTotal, step);
    return;
  }

  const steps = document.getElementsByClassName(`step ${trackId}-step`);

  for (let i = 0; i < steps.length; i++) {
    const current = (i - step) % stepTotal === 0;

    if (current) {
      steps[i].setAttribute('data-status', 'current');
    } else {
      steps[i].setAttribute('data-status', 'idle');
    }
  }
};

/**
 * Returns an array of sequential numbers from 0 to given length
 *
 * @param {number} length Length of array to return
 * @returns {array}
 */

export const newArray = length => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }
  return array;
};
