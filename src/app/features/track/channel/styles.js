import { css } from '@emotion/core';

const channel = css`
  display: flex;
  padding-left: 5px;
  margin-left: 5px;
  border-left: 1px dotted grey;
  > button {
    margin-right: 5px;
    background-color: var(--color-mid-grey);
    &:last-child {
      margin-right: 0;
      transform: skewX(8deg);
    }
    &.active {
      background-color: var(--color-tertiary);
    }
  }
`;

export { channel };
