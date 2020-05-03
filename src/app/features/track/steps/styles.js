import { css } from '@emotion/core';

const steps = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const progressIndicator = css`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--step-size);
  height: 100%;
  background-color: rgb(255, 189, 0);
`;

export { steps, progressIndicator };
