import React from 'react';

function linearStep(from, to, x, useClamp) {
  return useClamp ? clamp(from, to, x) : x;
}

function clamp(from, to, x) {
  let val = x;
  if (val < from) val = from;
  if (val > to) val = to;

  return val;
}

const useInterpolate = ({ inputRange: [minX, maxX], outputRange: [minY, maxY], clamp }) => {
  const slope = (maxY - minY) / (maxX - minX);

  function makeInterpolationFunc(x) {
    const res = (x - minX) * (slope + minY);

    return linearStep(minY, maxY, res, clamp);
  }

  return makeInterpolationFunc;
};

export default useInterpolate;
