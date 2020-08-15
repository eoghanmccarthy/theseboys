import React, { memo } from 'react';

import './styles.css';

const TrackContainer = memo(({ children }) => {
  return <div className={'track-container'}>{children}</div>;
});

const TrackMeta = memo(({ children }) => {
  return <div className={'track__meta'}>{children}</div>;
});

const TrackSteps = memo(({ children }) => {
  return <div className={'track__steps'}>{children}</div>;
});

const TrackControls = memo(({ children }) => {
  return <div className={'track__controls'}>{children}</div>;
});

export { TrackContainer, TrackMeta, TrackSteps, TrackControls };
