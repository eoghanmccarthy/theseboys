/**
 * Console logs for dev environment
 *
 * e.g. `consoleLog("Invalid arguments", arguments);`
 *
 * @param args
 * @constructor
 */
const consoleLog = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
};

export default consoleLog;
