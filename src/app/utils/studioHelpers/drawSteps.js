/**
 * Sets playback status data attribute
 *
 * @param {string} track Track name
 * @param {number} stepTotal Total number of steps in a row
 * @param {number} step Step index
 */

export default (track, stepTotal, step) => {
  const elements = document.getElementsByClassName(`${track}__step`);

  for (let i = 0; i < elements.length; i++) {
    const currentStep = (i - step) % stepTotal === 0;
    if (currentStep) {
      elements[i].setAttribute('data-step-playback-status', 'current');
    } else {
      elements[i].setAttribute('data-step-playback-status', 'idle');
    }
  }
};
