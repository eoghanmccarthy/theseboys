import React from 'react';
import { Button } from '@eoghanmccarthy/ui';

import * as styles from './styles';

const TrackButton = ({ children, shape = 'square', className, onClick }) => {
  return (
    <Button
      shape={shape}
      size={48}
      css={styles.trackButton}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default TrackButton;
