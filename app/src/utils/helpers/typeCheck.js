/**
 * Test if the arg is undefined
 */
export const isUndefined = arg => {
  return typeof arg === 'undefined';
};

/**
 * Test if the argument is null.
 */
export const isNull = arg => {
  return arg === null;
};

/**
 * Test if the argument is a string.
 */
export const isString = arg => {
  return typeof arg === 'string';
};

/**
 * Test if the argument is a boolean.
 */
export const isBoolean = arg => {
  return typeof arg === 'boolean';
};

/**
 * Test if the argument is an Array
 */
export const isArray = arg => {
  return Array.isArray(arg);
};

/**
 * Test if the given argument is an object;
 */
export const isObject = arg => {
  return Object.prototype.toString.call(arg) === '[object Object]';
};

/**
 * Test if the arg is a function
 */
export const isFunction = arg => {
  return typeof arg === 'function';
};

/**
 * Test if the argument is a number.
 */
export const isNumber = arg => {
  return typeof arg === 'number';
};
