import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import { fromPercent, toPercent } from '../utils';
import { VOL_MIN, VOL_MAX } from '../utils/constants';

import { Chevron } from 'componentLib/icon';
import Button from 'componentLib/button';
import { ButtonControl, ControllerGroup } from '../controller';

const TrackControls = memo(({ trackId, trackNumber, channel, onSample }) => {
  if (!trackId || !channel) return null;

  return (
    <div id={`${trackId}-controls`} className={`track-controls`}>
      <ControllerGroup>
        {trackNumber ? (
          <Button id={`${trackId}-sample`} size={32} onClick={onSample}>
            {trackNumber}
          </Button>
        ) : null}
        <Button
          className={cx({ alert: channel.muted })}
          size={32}
          onClick={e => {
            channel.set({ mute: !channel.muted });
            e.target.classList.toggle('alert');
          }}
        >
          M
        </Button>
      </ControllerGroup>
      <ControllerGroup>
        <ButtonControl
          id={`${trackId}-volume`}
          orient={'horizontal'}
          label={'VOL'}
          initialValue={toPercent([VOL_MIN, VOL_MAX], channel.get().volume) ?? 0}
          onChange={val => channel.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val) })}
        />
        <ButtonControl
          id={`${trackId}-pan`}
          orient={'horizontal'}
          label={'PAN'}
          step={0.1}
          min={-1}
          max={1}
          toFixed={1}
          initialValue={channel.get().pan ?? 0}
          onChange={val => channel.set({ pan: val })}
        />
        <Button
          size={36}
          onClick={e => {
            document.querySelector(`#${trackId}-effects`)?.classList.toggle('hidden');
            e.target.classList.toggle('rotated');
          }}
        >
          <Chevron width={'60%'} />
        </Button>
      </ControllerGroup>
    </div>
  );
});

export default TrackControls;
