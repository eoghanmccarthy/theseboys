import consoleLog from 'utils/errorHandlers/consoleLog';
import { isUndefined, isString, isNumber } from 'utils/helpers/typeCheck';

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

  const node = document.querySelector(`#${trackId} .step.row-${row}-step-${step}`);

  if (isUndefined(node)) {
    errorLog('node undefined', node);
    return false;
  }

  const value = node.getAttribute('data-value');

  if (isUndefined(value)) {
    errorLog('value undefined', value);
    return false;
  }

  return value === 'on';
};

export default isStepOn;
