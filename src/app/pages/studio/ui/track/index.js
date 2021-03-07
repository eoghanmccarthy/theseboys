import React, { memo } from 'react';

import './styles.css';

const TrackSteps = memo(({ children }) => {
  return <div className={'TrackSteps'}>{children}</div>;
});

export { TrackSteps };
