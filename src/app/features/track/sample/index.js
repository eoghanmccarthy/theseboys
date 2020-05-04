import React, { useContext } from 'react';

import { TrackContext } from '../trackProvider';

import * as styles from './styles';

import TrackButton from 'features/track/trackButton';

const Sample = () => {
  const { trackIndex, onPlaySample } = useContext(TrackContext);

  return (
    <div css={styles.sample}>
      <TrackButton onClick={onPlaySample}>
        <span>{trackIndex + 1}</span>
      </TrackButton>
    </div>
  );
};

export default Sample;
