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

  const interpVol = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 20],
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
    Destination.set({ volume: interpVol(volume) });
  }, []);

  return (
    <ControlBlock>
      <Control>
        <SliderWithValues
          title={'volume'}
          min={0}
          max={100}
          value={volume}
          onChange={e => {
            let value = Math.round(e.target.value);
            Destination.set({ volume: interpVol(value) });
            setVolume(value);
          }}
        />
      </Control>
      <Control size={'sm'}>
        <button
          className={cx({ active: mute })}
          onClick={() => {
            toggleMute(prv => {
              Destination.set({ mute: !prv });
              return !prv;
            });
          }}
        >
          mute
        </button>
      </Control>
    </ControlBlock>
  );
};

export default Volume;
