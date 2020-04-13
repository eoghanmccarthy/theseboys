const setIndexPrev = (current, length) =>
  current - 1 < 0 ? length - 1 : current - 1;

const setIndexNext = (current, length) =>
  current + 1 > length - 1 ? 0 : current + 1;

export { setIndexPrev, setIndexNext };
