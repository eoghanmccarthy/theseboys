import { css } from '@emotion/core';

const steps = css`
  display: grid;
  grid-auto-rows: 48px;
  grid-template-columns: repeat(16, 48px);
  grid-gap: 2px;
  position: relative;
  overflow: hidden;
`;

const progressIndicator = css`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--step-size);
  height: 100%;
  background-color: slategrey;
`;

export { steps, progressIndicator };
