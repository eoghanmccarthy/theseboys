import interpolate from './interpolate';

export default (from = [0, 100], val) => {
  const interpolatedValue = interpolate({ from });
  return Math.round(interpolatedValue(val)).toString();
};
