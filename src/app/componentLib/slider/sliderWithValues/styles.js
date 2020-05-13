import { css } from '@emotion/core';

const container = css`
  display: flex;
  flex-direction: column;
`;

const meta = css`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const title = css`
  font-style: italic;
  user-select: none;
`;

const value = css`
  user-select: none;
`;

export { container, meta, title, value };
