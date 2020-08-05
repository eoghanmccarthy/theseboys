import React, { memo } from 'react';

import './styles.css';

const TrackContainer = memo(({ children }) => {
  return <div className={'track-container'}>{children}</div>;
});

export default TrackContainer;
