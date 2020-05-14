import interpolate from 'utils/helpers/interpolate';

export default value => {
  const getInterpolatedValue = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 12],
    clamp: true
  });

  return getInterpolatedValue(value);
};
