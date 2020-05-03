import React, { useContext } from 'react';

import { TrackContext } from '../trackProvider';

import * as styles from './styles';

const Sample = () => {
  const { index, onPlaySample } = useContext(TrackContext);

  return (
    <div css={styles.sample}>
      <button onClick={onPlaySample}>
        <span>{index + 1}</span>
      </button>
    </div>
  );
};

export default Sample;
