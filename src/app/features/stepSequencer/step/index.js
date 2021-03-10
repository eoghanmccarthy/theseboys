import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import consoleLog from 'utils/errorHandlers/consoleLog';

const Step = memo(({ trackId, rowIndex, stepIndex }) => {
  if (!trackId || typeof rowIndex !== 'number' || typeof stepIndex !== 'number') {
    return null;
  }

  const handleClick = () => {
    const stepButton = document.querySelector(
      `.step.${trackId}-step.row-${rowIndex}-step-${stepIndex}`
    );

    if (!stepButton) {
      consoleLog(`step not found ${trackId} ${rowIndex} ${stepIndex}`);
      return;
    }

    const stepStatus = stepButton.getAttribute('data-value');

    if (stepStatus === 'off') {
      stepButton.setAttribute('data-value', 'on');
    } else {
      stepButton.setAttribute('data-value', 'off');
    }
  };

  return (
    <span
      className={`step ${trackId}-step row-${rowIndex}-step-${stepIndex}`}
      data-value={'off'}
      data-status={'idle'}
      onClick={handleClick}
    >
      <svg className={'step-zone'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'} />
      <svg className={'step-icon off'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'}>
        <circle cx={'15'} cy={'15'} r={'5'} />
      </svg>
      <svg className={'step-icon on'} xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 30 30'}>
        <circle cx={'15'} cy={'15'} r={'15'} />
      </svg>
    </span>
  );
});

export default Step;
