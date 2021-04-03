export default (stored = {}, defaults = {}) => {
  let obj = {};
  Object.keys(defaults).forEach(val => {
    obj[val] = stored?.[val] ?? defaults[val];
  });
  return obj;
};
