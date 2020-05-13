import React from 'react';

import * as styles from './styles';

const Control = ({ children, size = 'md', ...rest }) => {
  return (
    <div css={styles.control({ size })} {...rest}>
      {children}
    </div>
  );
};

export default Control;
