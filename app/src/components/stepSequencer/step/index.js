import React, { memo } from 'react';
import { isString, isNumber, isUndefined } from 'utils/typeCheck';

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
      onClick={handleClick}
    >
      <svg className={'step-icon off'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'}>
        <circle cx={'15'} cy={'15'} r={'1'} />
        {/*<rect x={'0'} y={'0'} width={30} height={30} />*/}
      </svg>
      <svg className={'step-icon on'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'}>
        <rect width={30} height={30} />
        {/*<polyline points={'0,0 30,30'} stroke={'black'} strokeWidth={'0.1'} />*/}
        {/*<polyline points={'30,0 0,30'} stroke={'black'} strokeWidth={'0.1'} />*/}
        {/*<circle cx={15} cy={15} r={1} fill={'black'} opacity={0.2} />*/}
      </svg>
    </button>
  );
});

export default Step;
