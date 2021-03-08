import interpolate from './interpolate';

export default (to = [0, 100], val, toFixed = 0) => {
  const interpolatedValue = interpolate({ to });
  return interpolatedValue(val);
};
