import { Draw } from 'tone';

import isStepOn from './isStepOn';
import drawSteps from './drawSteps';

/**
 * Function called on sequence step
 *
 * @param {number} time
 * @param {string} trackId
 * @param {number} numberOfRows
 * @param {number} numberOfSteps
 * @param {number} step
 * @param {function} onStepOn
 */

export default (time, trackId, numberOfRows, numberOfSteps, step, onStepOn) => {
  for (let row = 0; row < numberOfRows; row++) {
    const velocity = step === 0 ? 1 : 0.75;

    if (isStepOn(trackId, row, step)) {
      onStepOn(time, velocity);
    }
  }

  Draw.schedule(() => {
    drawSteps(trackId, numberOfSteps, step);
  }, time);
};
