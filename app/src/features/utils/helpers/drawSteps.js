import consoleLog from 'utils/errorHandlers/consoleLog';

/**
 * Sets data-status attribute on step DOM element
 *
 * @param {string} trackId
 * @param {number} stepTotal
 * @param {number} step
 */

export default (trackId, stepTotal, step) => {
  const steps = document.getElementsByClassName(`step ${trackId}-step`);

  const errorLog = msg => {
    consoleLog('drawSteps helper function,', msg, trackId, stepTotal, step);
  };

  if (!steps) {
    errorLog('steps not found');
    return;
  }

  for (let i = 0; i < steps.length; i++) {
    const currentStep = (i - step) % stepTotal === 0;
    if (currentStep) {
      steps[i].setAttribute('data-status', 'current');
    } else {
      steps[i].setAttribute('data-status', 'idle');
    }
  }
};
