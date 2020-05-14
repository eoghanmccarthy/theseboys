import { css } from '@emotion/core';

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 30px;
  margin-right: -30px;
  margin-left: -30px;
  border-bottom: 1px dotted grey;
  h2 {
    margin: 0;
    font-size: 16px;
  }
`;

const main = css`
  padding: 15px 0;
`;

const trackNav = css`
  display: flex;
  align-items: center;
  button {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const controlGrid = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  grid-gap: 10px;
  padding: 15px 0;
  border-bottom: 1px dotted grey;
  &:last-child {
    border-bottom: none;
  }
  > * {
    width: auto;
  }
`;

export { header, main, trackNav, controlGrid };
