import React from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { Destination, Transport } from 'tone';

import './styles.css';

import { fromPercent, toPercent } from '../../utils';

import Button from 'componentLib/Button';
import useMasterContext from '../useMasterContext';
import { ButtonControl, ControllerGroup, SliderControl } from '../../controller';

const VOL_MIN = -60;
const VOL_MAX = 20;
const BPM_MIN = 60;
const BPM_MAX = 240;

const Master = ({ initialValue = {} }) => {
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
          onChange={val => Destination.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val, 0) })}
        />
        <ControllerGroup>
          <Button className={'record-button'} onClick={record} />
          <Button className={cx('playback-button play')} value={'off'} onClick={play} />
          <Button className={cx('playback-button stop')} value={'on'} onClick={stop} />
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
          onClick={() =>
            dispatch({
              type: 'master/SAVE',
              payload: {
                bpm: Transport.get().bpm.toFixed(0),
                volume: toPercent([VOL_MIN, VOL_MAX], Destination.get().volume)
              }
            })
          }
        >
          save
        </button>
        <button
          onClick={() =>
            dispatch({
              type: 'RESET_STORE'
            })
          }
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default Master;
