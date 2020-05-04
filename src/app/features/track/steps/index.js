import React from 'react';

import * as styles from './styles';

const Steps = ({ children }) => {
  return (
    <div css={styles.steps}>
      <div css={styles.progressIndicator} className={'progress-indicator'} />
      {children}
    </div>
  );
};

export default Steps;
