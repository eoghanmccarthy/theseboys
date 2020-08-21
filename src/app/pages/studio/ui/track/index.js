import React, { memo } from 'react';

import './styles.css';

const TrackContainer = memo(({ children }) => {
  return <div className={'track'}>{children}</div>;
});

const TrackMeta = memo(({ children }) => {
  return <div className={'track__meta'}>{children}</div>;
});

const TrackSteps = memo(({ children }) => {
  return <div className={'track__steps'}>{children}</div>;
});

const TrackControls = memo(({ children, trackId }) => {
  return <div className={`track__controls ${trackId}`}>{children}</div>;
});

export { TrackContainer, TrackMeta, TrackSteps, TrackControls };
