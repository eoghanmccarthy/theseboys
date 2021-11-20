import { interpolate } from './interpolate';

export const fromPercent = (to = [0, 100], val, toFixed = 0) => {
  const interpolatedValue = interpolate({ to });
  return interpolatedValue(val);
};
