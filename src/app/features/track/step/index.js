import React from 'react';
import { css } from '@emotion/core';

import * as styles from './styles';

const Step = ({ stepIndex, value, stepState, setStepState }) => {
  return (
    <button
      css={css`
        ${styles.step}
        background-color: ${
          value === 1 ? 'var(--color-primary)' : value === 2 ? 'var(--color-secondary)' : 'white'
        }
      `}
      onClick={e => {
        e.preventDefault();
        let shiftEnabled = e.shiftKey === true;
        let steps = stepState;
        let val =
          steps[stepIndex] === 0
            ? shiftEnabled
              ? 2
              : 1
            : steps[stepIndex] === 1 && shiftEnabled
            ? 2
            : steps[stepIndex] === 2 && shiftEnabled
            ? 1
            : 0;
        steps[stepIndex] = val;
        setStepState(steps);
      }}
    />
  );
};

export default Step;
