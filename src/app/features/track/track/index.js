import React from 'react';

import * as styles from './styles';

const Track = ({ children }) => {
  return <div css={styles.track}>{children}</div>;
};

export default Track;
