import { css } from '@emotion/core';

const module = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const moduleMain = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export { module, moduleMain };
