import { css } from '@emotion/core';

const pad = ({ state }) => css`
  width: 200px;
  height: 200px;
  padding: 5px;
  background-color: blue;
  opacity: 1;
  transition: all 0.25s ease 0s;
  &:hover {
    opacity: 0.9;
  }
`;

const values = css`
  font-size: 14px;
  user-select: none;
  margin-bottom: 5px;
  span {
    margin-left: 5px;
  }
`;

export { pad, values };
