import { css } from '@emotion/core';

const control = ({ size }) => css`
  width: ${getSizing(size).width}px;
  height: 64px;
  padding: 5px;
  font-size: ${getSizing(size).fontSize}px;
  background-color: #1b1a22;
  border: 1px solid slategrey;
  border-radius: 4px;
  // box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
  //   0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);
  &:focus-within {
    box-shadow: 0 0 0 2px var(--color-secondary);
  }
  > button {
    width: 100%;
    height: 100%;
    color: white;
    background-color: transparent;
    border-width: 0;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    &.active {
      background-color: var(--color-secondary);
    }
  }
`;

export { control };

const getSizing = size => {
  const sizes = {
    sm: { width: 70, fontSize: 12 },
    md: { width: 140, fontSize: 16 }
  };

  return sizes[size] || 140;
};
