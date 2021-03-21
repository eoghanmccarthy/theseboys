import React, { memo } from 'react';

import './styles.css';

import { fromPercent, toPercent } from '../utils';
import { VOL_MIN, VOL_MAX } from '../utils/constants';

import { Chevron } from 'componentLib/icon';
import Button from 'componentLib/button';
import { ButtonControl, ControllerGroup } from '../controller';

const TrackControls = memo(({ index, trackId, channel, onSample }) => {
  if (!trackId || !channel) return null;

  return (
    <div id={`${trackId}-controls`} className={`track-controls`}>
      <ControllerGroup>
        <Button id={`${trackId}-sample`} size={32} onClick={onSample}>
          {index + 1}
        </Button>
        <Button
          size={32}
          onClick={e => {
            const { mute } = channel.get();
            channel.set({ mute: !mute });
            if (!mute) {
              e.target.classList.add('alert');
            } else {
              e.target.classList.remove('alert');
            }
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
            const element = document.querySelector(`#${trackId}-effects`);
            if (!element.classList.contains('hidden')) {
              element.classList.add('hidden');
              e.target.classList.add('rotated');
            } else {
              element.classList.remove('hidden');
              e.target.classList.remove('rotated');
            }
          }}
        >
          <Chevron width={'60%'} />
        </Button>
      </ControllerGroup>
    </div>
  );
});

export default TrackControls;
