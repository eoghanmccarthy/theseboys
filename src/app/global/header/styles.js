import { css } from '@emotion/core';

export default css`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  svg {
    height: 100%;
    cursor: pointer;
  }
  svg path {
    fill: black;
  }
`;
