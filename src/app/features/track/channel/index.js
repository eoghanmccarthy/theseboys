import React, { useContext } from 'react';
import cx from 'classnames';

import { Button } from '@eoghanmccarthy/ui';

import { TrackContext } from '../trackProvider';

import * as styles from './styles';

const Channel = ({ channelOpts, setChannelOpts, setSelectedTrack, openDialog }) => {
  const { index } = useContext(TrackContext);

  return (
    <div css={styles.channel}>
      <button
        className={cx({ active: channelOpts[index].mute })}
        onClick={() => {
          setChannelOpts(
            channelOpts.map((c, i) => {
              if (index === i) return { ...c, mute: !c.mute };
              return c;
            })
          );
        }}
      >
        mute
      </button>
      <Button
        onClick={() => {
          openDialog();
          setSelectedTrack(index);
        }}
      >
        +
      </Button>
    </div>
  );
};

export default Channel;
