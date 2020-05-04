import React from 'react';
import { css } from '@emotion/core';

const Step = ({ value, onClick }) => {
  return (
    <button
      css={css`
        background-color: ${value === 1
          ? 'var(--color-primary)'
          : value === 2
          ? 'var(--color-secondary)'
          : 'white'};
      `}
      onClick={e => {
        e.preventDefault();
        let shiftEnabled = e.shiftKey === true;
        let val =
          value === 0
            ? shiftEnabled
              ? 2
              : 1
            : value === 1 && shiftEnabled
            ? 2
            : value === 2 && shiftEnabled
            ? 1
            : 0;

        onClick(val);
      }}
    />
  );
};

export default Step;
