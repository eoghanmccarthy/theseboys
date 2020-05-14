import { css } from '@emotion/core';

const console = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const modules = css`
  flex: 1;
  display: flex;
  position: relative;
`;

const prev = css`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
`;

const next = css`
  z-index: 1;
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
`;

const svg = css`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
`;

export { console, modules, prev, next, svg };
