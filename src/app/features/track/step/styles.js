import { css } from '@emotion/core';

const step = css`
  z-index: 1;
  border-right: 1px solid black;
  opacity: 0.92;
  &:last-child {
    border-right-width: 0;
  }
`;

export { step };
