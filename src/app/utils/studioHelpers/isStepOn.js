/**
 * Gets data attribute to checks if step is scheduled to play
 *
 * @param {string} track Track name
 * @param {string} row Row id
 * @param {string} step Step id
 * @returns {boolean}
 */

export default (track, row, step) =>
  document
    .querySelector(`.${track}__step.track-${row}-step-${step}`)
    .getAttribute('data-step-status') === 'on';
