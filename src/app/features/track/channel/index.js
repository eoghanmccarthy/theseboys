import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';

import * as styles from './styles';

import { TrackContext } from '../trackProvider';

import TrackButton from 'features/track/trackButton';

const Channel = ({ channelState, openDialog, tracksDispatch }) => {
  const { trackIndex, channelRef } = useContext(TrackContext);

  return (
    <div css={styles.channel}>
      <TrackButton
        className={cx({ active: channelState.mute ?? false })}
        onClick={() => {
          channelRef.current.set({ mute: !channelState.mute });
          tracksDispatch({ type: 'mute', payload: { trackIndex } });
        }}
      >
        mute
      </TrackButton>
      <TrackButton shape={'circle'} onClick={() => openDialog(trackIndex)}>
        +
      </TrackButton>
    </div>
  );
};

export default Channel;
