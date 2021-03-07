import React, { memo } from 'react';

import './styles.css';

import { fromPercent } from 'features/utils';

import Button from 'componentLib/Button';
import { ButtonControl, ControllerGroup } from '../../controller';

const VOL_MIN = -60;
const VOL_MAX = 20;

const TrackControls = memo(({ trackId, channel, defaultValues }) => {
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
      <ControllerGroup>
        <ButtonControl
          id={`${trackId}-volume`}
          orient={'horizontal'}
          label={'VOL'}
          max={100}
          initialValue={defaultValues.volume ?? 75}
          onChange={val => channel.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val, 0) })}
        />
        <ButtonControl
          id={`${trackId}-pan`}
          orient={'horizontal'}
          label={'PAN'}
          min={-1}
          initialValue={defaultValues.pan ?? 0}
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
