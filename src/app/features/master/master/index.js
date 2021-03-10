import React from 'react';
import { useDispatch } from 'react-redux';
import { Destination, Transport } from 'tone';

import './styles.css';

import { BPM_MIN, BPM_MAX, VOL_MIN, VOL_MAX } from '../../utils/constants';
import { fromPercent, toPercent } from '../../utils';

import { Circle, Polygon, Square } from 'componentLib/icon';
import Button from 'componentLib/button';
import useMasterContext from '../useMasterContext';
import { ButtonControl, ControllerGroup, SliderControl } from '../../controller';

const Master = ({ onSave, initialValue = {} }) => {
  const dispatch = useDispatch();
  const { play, stop, record } = useMasterContext('<Master>');

  return (
    <div id={'master'} data-playback={'stopped'} data-recorder={'off'}>
      <div className={'main'}>
        <SliderControl
          id={'master-volume'}
          orient={'horizontal'}
          label={'VOL'}
          step={1}
          max={100}
          initialValue={initialValue.volume}
          onChange={val => Destination.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val) })}
        />
        <ControllerGroup>
          <Button className={'playback record'} onClick={record}>
            <Circle width={'64%'} />
          </Button>
          <Button className={'playback play'} value={'off'} onClick={play}>
            <Polygon width={'72%'} />
          </Button>
          <Button className={'playback stop'} value={'on'} onClick={stop}>
            <Square width={'60%'} />
          </Button>
        </ControllerGroup>
        <ButtonControl
          id={'master-bpm'}
          orient={'horizontal'}
          label={'BPM'}
          min={BPM_MIN}
          max={BPM_MAX}
          initialValue={initialValue.bpm}
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
                volume: toPercent([VOL_MIN, VOL_MAX], Destination.get().volume)
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
