import React, { memo } from 'react';

import './styles.css';

import { fromPercent } from '../utils';
import { VOL_MIN, VOL_MAX } from '../utils/constants';

import Button from 'componentLib/button';
import { ButtonControl, ControllerGroup } from '../controller';

const TrackControls = memo(({ trackId, channel, initialValue }) => {
  if (!trackId || !channel) return null;

  return (
    <div id={`${trackId}-controls`} className={`track-controls`}>
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
      />
      <ControllerGroup>
        <ButtonControl
          id={`${trackId}-volume`}
          orient={'horizontal'}
          label={'VOL'}
          initialValue={initialValue.volume}
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
          initialValue={initialValue.pan}
          onChange={val => channel.set({ pan: val })}
        />
        <Button
          className={'toggle-effects'}
          size={40}
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
          <span />
          <span />
        </Button>
      </ControllerGroup>
    </div>
  );
});

export default TrackControls;
