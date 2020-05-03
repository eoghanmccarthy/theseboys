import { css } from '@emotion/core';

const module = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const moduleHead = css`
  height: 72px;
  padding: var(--spacing-sm) var(--spacing-md) 0;
  h1 {
    margin: 0;
    font-size: 24px;
  }
`;

const moduleMain = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { module, moduleHead, moduleMain };
