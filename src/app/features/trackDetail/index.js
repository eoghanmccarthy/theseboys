import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Button } from '@eoghanmccarthy/ui';
import { css } from '@emotion/core';
import cx from 'classnames';

import './styles.scss';
import * as styles from './styles';

import { TrackContext } from '../track/trackProvider';

import interpolate from 'utils/helpers/interpolate';
import { setIndexPrev, setIndexNext } from 'utils/helpers/setSoundIndex';

import { Control, ControlBlock } from 'componentLib/control';
import { SliderWithValues } from 'componentLib/slider';

const TrackDetail = ({
  channelState,
  selectedTrackIndex,
  setSelectedTrack,
  tracksCount,
  track,
  instrument,
  onUpdateChannel,
  onUpdateInstrument,
  onUpdateEffect
}) => {
  const { trackIndex, channelRef } = useContext(TrackContext);

  const { effects } = track;

  const { options: instrumentOptions } = instrument;

  const interpVol = interpolate({
    inputRange: [0, 100],
    outputRange: [-20, 24],
    clamp: true
  });

  const [channel, setChannel] = useState(channelState);

  return (
    <div className={'track-detail'}>
      <header css={styles.header}>
        <h2>
          track <em>{selectedTrackIndex + 1}</em>
        </h2>
        <div css={styles.trackNav}>
          <Button
            size={'sm'}
            onClick={() => {
              setSelectedTrack(i => {
                return setIndexPrev(i, tracksCount);
              });
            }}
          >
            prev
          </Button>
          <Button
            size={'sm'}
            onClick={() => {
              setSelectedTrack(i => {
                return setIndexNext(i, tracksCount);
              });
            }}
          >
            next
          </Button>
        </div>
      </header>
      <div css={styles.main}></div>
    </div>
  );
};

export default TrackDetail;
