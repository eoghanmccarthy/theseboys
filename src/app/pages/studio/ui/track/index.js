import React, { memo } from 'react';

import './styles.css';

const TrackMeta = memo(({ children }) => {
  return <div className={'TrackControls'}>{children}</div>;
});

const TrackSteps = memo(({ children }) => {
  return <div className={'TrackSteps'}>{children}</div>;
});

export { TrackMeta, TrackSteps };
