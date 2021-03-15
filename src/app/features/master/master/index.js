import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Destination, Transport } from 'tone';

import './styles.css';

import { BPM_MIN, BPM_MAX, VOL_MIN, VOL_MAX } from '../../utils/constants';
import { fromPercent, toPercent } from '../../utils';

import { Circle, Play, Square } from 'componentLib/icon';
import Button from 'componentLib/button';
import useMasterContext from '../useMasterContext';
import { ButtonControl, ControllerGroup, SliderControl } from '../../controller';

const Master = ({ onSave }) => {
  const dispatch = useDispatch();
  const { play, stop, record } = useMasterContext('<Master>');
  const store = useSelector(state => state?.app?.master);
  const [initialValue] = useState(store);

  return (
    <div id={'master'} data-playback={'stopped'} data-recorder={'off'}>
      <div className={'main'}>
        <SliderControl
          id={'master-volume'}
          orient={'horizontal'}
          label={'VOL'}
          step={1}
          max={100}
          initialValue={toPercent([VOL_MIN, VOL_MAX], initialValue.volume) ?? 0}
          onChange={val => Destination.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val) })}
        />
        <ControllerGroup>
          <Button className={'playback record'} variant={'outlined'} onClick={record}>
            <Circle width={'64%'} />
          </Button>
          <Button className={'playback play'} variant={'outlined'} value={'off'} onClick={play}>
            <Play width={'72%'} />
          </Button>
          <Button className={'playback stop'} variant={'outlined'} value={'on'} onClick={stop}>
            <Square width={'54%'} />
          </Button>
        </ControllerGroup>
        <ButtonControl
          id={'master-bpm'}
          orient={'horizontal'}
          label={'BPM'}
          min={BPM_MIN}
          max={BPM_MAX}
          initialValue={initialValue.bpm ?? 120}
          onChange={val => Transport.set({ bpm: val })}
        />
      </div>
      <div className={'sub'}>
        <button
          onClick={() => {
            onSave();
            dispatch({
              type: 'master/SAVE',
              payload: {
                bpm: Transport.get().bpm,
                volume: Destination.get().volume
              }
            });
          }}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Master;
