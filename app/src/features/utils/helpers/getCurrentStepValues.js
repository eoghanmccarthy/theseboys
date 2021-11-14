import consoleLog from 'utils/errorHandlers/consoleLog';
import { isString } from 'utils/helpers/typeCheck';

export default trackId => {
  const errorLog = (...args) => {
    consoleLog('drawSteps,', ...args);
  };

  if (!isString(trackId)) {
    errorLog('invalid args', trackId);
    return;
  }

  const rows = document.querySelectorAll(`#${trackId}-steps .steps`);

  let arr = [];
  for (let i = 0; i < rows.length; i++) {
    let rowValues = [];
    const steps = rows[i].querySelectorAll(`.step`);
    for (let i = 0; i < steps.length; i++) {
      steps[i].getAttribute('data-value') === 'on' ? rowValues.push(1) : rowValues.push(0);
    }
    arr.push(rowValues);
  }
  return arr;
};
