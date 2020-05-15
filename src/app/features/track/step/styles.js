import { css } from '@emotion/core';

const step = ({ value }) => css`
  z-index: 1;
  background-color: ${value === 1
    ? 'var(--color-primary)'
    : value === 2
    ? 'var(--color-secondary)'
    : 'var(--color-light-grey)'};
  opacity: 0.92;
`;

export { step };
