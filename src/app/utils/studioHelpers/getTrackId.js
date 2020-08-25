import shortId from 'shortid';

/**
 * Generates unique track id
 *
 * @returns {string}
 */

export default () => {
  return `track-${shortId.generate()}`;
};
