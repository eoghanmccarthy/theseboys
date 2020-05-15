import React from 'react';

import * as styles from './styles';

const InstrumentContainer = ({ children, ...rest }) => {
  return (
    <div css={styles.container} {...rest}>
      {children}
    </div>
  );
};

export default InstrumentContainer;
