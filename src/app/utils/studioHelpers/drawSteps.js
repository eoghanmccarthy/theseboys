/**
 * Sets playback status data attribute
 *
 * @param {string} trackId Track name
 * @param {number} stepTotal Total number of steps in a row
 * @param {number} step Step index
 */

export default (trackId, stepTotal, step) => {
  const steps = document.getElementsByClassName(`step ${trackId}`);

  for (let i = 0; i < steps.length; i++) {
    const currentStep = (i - step) % stepTotal === 0;
    if (currentStep) {
      steps[i].setAttribute('data-status', 'current');
    } else {
      steps[i].setAttribute('data-status', 'idle');
    }
  }
};
