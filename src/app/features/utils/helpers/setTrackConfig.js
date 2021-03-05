import newArray from 'utils/studioHelpers/newArray';

/**
 * Set track initial config state
 *
 * @param {array | undefined} notes
 * @param {number} numSteps
 *
 * @return {{notes: array | undefined}}
 */

export default ({ notes, numSteps }) => {
  if (!Array.isArray(notes)) {
    notes = [];
  }

  if (typeof numSteps !== 'number') {
    numSteps = 16;
  }

  return {
    notes,
    numRows: Math.max(1, notes.length),
    numSteps,
    noteInterval: `${numSteps}n`,
    noteIndices: newArray(numSteps)
  };
};
