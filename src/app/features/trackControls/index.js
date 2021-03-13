import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';

import { fromPercent, getInitialValue } from '../utils';
import { VOL_MIN, VOL_MAX } from '../utils/constants';

import { Chevron } from 'componentLib/icon';
import Button from 'componentLib/button';
import { ButtonControl, ControllerGroup } from '../controller';

const TrackControls = memo(({ index, trackId, channel, defaultValue }) => {
  if (!trackId || !channel) return null;
  const store = useSelector(state => state.app);
  const [initialValue] = useState(getInitialValue(store?.tracks?.[trackId]?.channel, defaultValue));

  return (
    <div id={`${trackId}-controls`} className={`track-controls`}>
      <ControllerGroup>
        <Button isDisabled size={32}>
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
        />
      </ControllerGroup>
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
