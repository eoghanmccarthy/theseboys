/**
 * Returns an array of sequential numbers from 0 to given length
 *
 * @param {number} length Length of array to return
 * @returns {array}
 */

export const newArray = length => {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }
  return array;
};
