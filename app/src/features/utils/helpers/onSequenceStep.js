import { Draw } from 'tone';

import isStepOn from './isStepOn';
import drawSteps from './drawSteps';

/**
 * Function called on sequence step
 *
 * @param {string} trackId
 * @param {array} notes
 * @param {number} numSteps
 * @param {number} time
 * @param {number} step
 * @param {function} onStepOn
 */

export default (trackId, notes = [], numSteps, time, step, onStepOn) => {
  if (!Array.isArray(notes)) {
    notes = [];
  }

  const numRows = Math.max(1, notes.length);

  let notesToPlay = [];

  const velocity = step === 0 ? 1 : 0.75;
  // const velocity = random(0.5, 1);

  for (let row = 0; row < numRows; row++) {
    if (isStepOn(trackId, row, step)) {
      if (!Array.isArray(notes) || !notes.length) {
        onStepOn(null, velocity);
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
