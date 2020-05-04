import React from 'react';

import * as styles from './styles';

const Channel = ({ children }) => {
  return <div css={styles.channel}>{children}</div>;
};

export default Channel;
