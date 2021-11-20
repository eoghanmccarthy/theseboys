import React, { memo } from 'react';
import { isString, isNumber, isUndefined } from 'utils/helpers/typeCheck';

import './styles.css';

const Step = memo(({ trackId, stepValue, rowIndex, stepIndex }) => {
  if (!isString(trackId) || !isNumber(rowIndex) || !isNumber(stepIndex)) {
    return null;
  }

  const handleClick = e => {
    const target = e.currentTarget;
    const value = target.value;

    if (!isUndefined(value)) {
      target.setAttribute('value', value === 'off' ? 'on' : 'off');
    }
  };

  return (
    <button
      className={`step ${trackId}-step row-${rowIndex}-step-${stepIndex}`}
      value={stepValue ? 'on' : 'off'}
      data-status={'idle'}
      onClick={e => handleClick(e)}
    >
      <svg className={'step-zone'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'} />
      <svg className={'step-icon off'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'}>
        <circle cx={'15'} cy={'15'} r={'5'} />
      </svg>
      <svg className={'step-icon on'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'}>
        <circle cx={'15'} cy={'15'} r={'15'} />
      </svg>
    </button>
  );
});

export default Step;
