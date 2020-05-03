import { css } from '@emotion/core';

const oscillator = css`
  transform: skewX(-8deg);
`;

const pad = css`
  width: 200px;
  height: 200px;
  padding: 5px;
  background-color: blue;
`;

const values = css`
  font-size: 14px;
  user-select: none;
  margin-bottom: 5px;
  span {
    margin-left: 5px;
  }
`;

export { pad, oscillator, values };
