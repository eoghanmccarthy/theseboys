function linearStep(from, to, x, useClamp) {
  return useClamp ? clamp(from, to, x) : x;
}

function clamp(from, to, x) {
  let val = x;
  if (val < from) val = from;
  if (val > to) val = to;

  return val;
}

export const interpolate = ({ from = [0, 100], to = [0, 100], clamp = true }) => {
  function makeInterpolationFunc(x, { from: [minX, maxX] = from, to: [minY, maxY] = to } = {}) {
    const slope = (maxY - minY) / (maxX - minX);

    const a = -slope * minX + minY;

    const res = slope * x + a;

    return linearStep(minY, maxY, res, clamp);
  }

  return makeInterpolationFunc;
};
