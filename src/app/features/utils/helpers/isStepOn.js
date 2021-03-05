import consoleLog from 'utils/errorHandlers/consoleLog';

/**
 * Function to check if step is scheduled to play
 *
 * @param {string} trackId
 * @param {number} row
 * @param {number} step
 * @returns {boolean}
 */

export default (trackId, row, step) => {
  const sendError = msg => {
    consoleLog('isStepOn helper function,', msg, trackId, row, step);
  };

  if (typeof trackId !== 'string') {
    sendError('trackId is invalid');
    return false;
  }

  const node = document.querySelector(`.step.${trackId}.row-${row}-step-${step}`);

  if (!node) {
    sendError('step node not found');
    return false;
  }

  const value = node.getAttribute('data-value');

  return value === 'on';
};
