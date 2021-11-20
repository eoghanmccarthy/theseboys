function linearStep(from, to, x, useClamp) {
  return useClamp ? clamp(from, to, x) : x;
}

function clamp(from, to, x) {
  let val = x;
  if (val < from) val = from;
  if (val > to) val = to;

  return val;
}

export const interpolate = ({
  from: [minX, maxX] = [0, 100],
  to: [minY, maxY] = [0, 100],
  clamp = true
}) => {
  const slope = (maxY - minY) / (maxX - minX);

  function makeInterpolationFunc(x) {
    const a = -slope * minX + minY;

    const res = slope * x + a;

    return linearStep(minY, maxY, res, clamp);
  }

  return makeInterpolationFunc;
};
