import LogRocket from 'logrocket';

/**
 * Implements error login for various purposes.
 * This function must be used as error handler for other users
 * taking into account this function does not throw an error but
 * only register and error message.
 *
 * e.g. `errorLog("Invalid arguments", arguments);`
 *
 * @param args
 * @constructor
 */
const errorLog = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    // We only use console.log on dev or test environments,
    // anyway LogRocket captures console.log calls
    console.log(...args);
    return;
  }

  // For production environment we use LogRocket directly
  LogRocket.error(...args);
};

export default errorLog;
