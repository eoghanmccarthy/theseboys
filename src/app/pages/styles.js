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

const nav = css`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  top: 72px;
  right: 30px;
  left: 30px;
  padding: var(--spacing-sm) 0;
  border-top: 1px dotted grey;
`;

export { console, modules, nav };
