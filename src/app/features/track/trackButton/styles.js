import { css } from '@emotion/core';

const trackButton = css`
  width: 48px;
  background-color: var(--color-light-grey);
  &:hover {
    opacity: 0.72;
  }
  &:focus {
    box-shadow: none !important;
  }
`;

export { trackButton };
