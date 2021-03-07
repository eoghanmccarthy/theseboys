import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import Button from 'componentLib/Button';
import ButtonGroup from 'componentLib/ButtonGroup';
import ChannelControls from '../channelControls';

const TrackControls = memo(({ trackId, channel }) => {
  if (!trackId || !channel) return null;

  return (
    <div id={`${trackId}-controls`} className={`track-controls`}>
      <Button
        onClick={e => {
          const { mute } = channel.get();
          channel.set({ mute: !mute });
          if (!mute) {
            e.target.classList.add('active');
          } else {
            e.target.classList.remove('active');
          }
        }}
      >
        mute
      </Button>
      <ButtonGroup>
        <ChannelControls trackId={trackId} channel={channel} />
        <Button
          className={'toggle-effects'}
          value={'expanded'}
          size={40}
          onClick={e => {
            const element = document.querySelector(`#${trackId}-effects`);
            if (element.style.display !== 'none') {
              element.style.display = 'none';
              e.target.style.transform = 'rotate(0deg)';
              //e.target.setAttribute('value', 'collapsed');
            } else {
              element.style.display = 'grid';
              e.target.style.transform = 'rotate(180deg)';
              // e.target.setAttribute('value', 'expanded');
            }
          }}
        >
          <span />
          <span />
        </Button>
      </ButtonGroup>
    </div>
  );
});

export default TrackControls;
