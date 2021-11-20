import consoleLog from 'utils/errorHandlers/consoleLog';
import { isString, isNumber } from 'utils/helpers/typeCheck';

/**
 * @param {string} trackId
 * @param {number} stepTotal
 * @param {number} step
 */

export const drawSteps = (trackId, stepTotal, step) => {
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
