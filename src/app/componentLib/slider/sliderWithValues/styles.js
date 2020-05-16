import { css } from '@emotion/core';

const container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const meta = css`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2px;
`;

const title = css`
  font-style: italic;
  user-select: none;
`;

const value = css`
  user-select: none;
`;

export { container, meta, title, value };
