import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Destination } from 'tone';

import './styles.scss';

import interpolate from 'utils/helpers/interpolate';
import useEventListener from 'utils/hooks/useEventListener';

import { Control, ControlBlock } from 'componentLib/control';
import { SliderWithValues } from 'componentLib/slider';

const Volume = () => {
  const [volume, setVolume] = useState(80);
  const [mute, toggleMute] = useState(false);

  const interpolateVolume = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 12],
    clamp: true
  });

  useEventListener('keydown', e => {
    switch (e.code) {
      case 'ArrowUp':
        if (e.shiftKey) {
          setVolume(v => {
            if (v + 1 <= 100) return v + 1;
            return v;
          });
        }
        break;
      case 'ArrowDown':
        if (e.shiftKey) {
          setVolume(v => {
            if (v - 1 >= 0) return v - 1;
            return v;
          });
        }
        break;
      case 'KeyM':
        if (e.shiftKey) toggleMute(m => !m);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    Destination.set({ volume: interpolateVolume(volume) });
  }, [volume]);

  useEffect(() => {
    Destination.set({ mute: mute });
  }, [mute]);

  return (
    <ControlBlock>
      <Control>
        <SliderWithValues
          title={'volume'}
          min={0}
          max={100}
          value={volume}
          onChange={e => {
            let value = e.target.value;
            setVolume(Math.round(value));
          }}
        />
      </Control>
      <Control size={'sm'}>
        <button className={cx({ active: mute })} onClick={() => toggleMute(m => !m)}>
          mute
        </button>
      </Control>
    </ControlBlock>
  );
};

export default Volume;
