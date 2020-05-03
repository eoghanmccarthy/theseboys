import { css } from '@emotion/core';

const track = css`
  display: flex;
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--step-size);
    height: var(--step-size);
    border-width: 0;
    outline: none;
    cursor: pointer;
  }
`;

export { track };
