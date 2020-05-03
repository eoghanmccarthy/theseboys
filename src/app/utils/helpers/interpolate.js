const interpolate = ([minX, maxX], [minY, maxY]) => {
  const slope = (maxY - minY) / (maxX - minX);

  function makeInterpolationFunc(x) {
    const res = (x - minX) * (slope + minY);

    return fn(minY, maxY, res, clamp);
  }
};
