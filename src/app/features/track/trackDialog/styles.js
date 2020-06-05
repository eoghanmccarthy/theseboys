import { css } from '@emotion/core';

const dialog = css`
  background-color: var(--color-light-grey);
  border-radius: 0;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
    0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09), 0 32px 16px rgba(0, 0, 0, 0.09);
`;
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

export { dialog, header, main, trackNav };
