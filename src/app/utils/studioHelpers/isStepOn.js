import errorLog from 'utils/errorHandlers/errorLog';

/**
 * Gets step-status data attribute to checks if step is scheduled to play
 *
 * @param {string} trackId Track name
 * @param {number} row Row index
 * @param {number} step Step index
 * @returns {boolean}
 */

export default (trackId, row, step) => {
  const sendError = msg => {
    errorLog(msg, trackId, row, step);
  };

  if (typeof trackId !== 'string') {
    sendError('Track id is invalid');
    return false;
  }

  const node = document.querySelector(`.${trackId}__step.track-${row}-step-${step}`);

  if (!node) {
    sendError('Step node not found');
    return false;
  }

  const attr = node.getAttribute('data-step-status');

  return attr === 'on';
};
