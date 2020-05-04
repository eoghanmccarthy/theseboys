import React from 'react';

import * as styles from './styles';

const TrackButton = ({ children, className, onClick }) => {
  return (
    <button css={styles.trackButton} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default TrackButton;
