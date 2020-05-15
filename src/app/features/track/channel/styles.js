import { css } from '@emotion/core';

const channel = css`
  display: flex;
  padding-left: 5px;
  margin-left: 5px;
  border-left: 1px dotted grey;
  > button {
    margin-right: 5px;
    color: var(--color-mid-grey);
    &:last-child {
      margin-right: 0;
    }
    &.active {
      background-color: var(--color-tertiary);
    }
  }
`;

export { channel };
