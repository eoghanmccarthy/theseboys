import { css } from '@emotion/core';

const track = css`
  display: flex;
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
`;

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

const controlGrid = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto;
  grid-gap: 10px;
  padding: 15px 0;
  border-bottom: 1px dotted grey;
  &:last-child {
    border-bottom: none;
  }
  > .control {
    width: auto;
    background-color: transparent;
    border: none;
  }
  > .control-group-title {
    span {
      display: block;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1em;
      word-break: break-all;
      line-height: 1.2;
      transform: skew(15deg);
      transform-origin: top left;
    }
  }
`;

export { track, channel, controlGrid };
