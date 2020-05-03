import { css } from '@emotion/core';

export default css`
  grid-area: footer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-sm);
  svg {
    height: 100%;
    cursor: pointer;
  }
  svg path {
    fill: var(--color-primary);
  }
`;
