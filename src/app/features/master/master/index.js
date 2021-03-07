import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { Destination, Transport } from 'tone';

import './styles.css';

import { fromPercent, toPercent } from '../../utils';

import Button from 'componentLib/Button';
import ButtonGroup from 'componentLib/ButtonGroup';
import useMasterContext from '../useMasterContext';
import ButtonControl from '../../buttonControl';
import SliderControl from '../../sliderControl';

const VOL_MIN = -60;
const VOL_MAX = 20;
const BPM_MIN = 60;
const BPM_MAX = 240;

const Master = () => {
  const dispatch = useDispatch();
  const { bpm, volume } = useSelector(state => state.app.master);
  const { play, stop, record } = useMasterContext('<Master>');

  return (
    <div id={'master'} data-playback={'stopped'} data-recorder={'off'}>
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
      <SliderControl
        id={'master-volume'}
        orient={'horizontal'}
        label={'VOL'}
        step={1}
        max={100}
        initialValue={volume}
        onChange={val => Destination.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val, 0) })}
      />
      <ButtonGroup>
        <Button className={'record-button'} onClick={record} />
        <Button className={cx('playback-button play')} value={'off'} onClick={play} />
        <Button className={cx('playback-button stop')} value={'on'} onClick={stop} />
      </ButtonGroup>
      <ButtonControl
        id={'master-bpm'}
        orient={'horizontal'}
        label={'BPM'}
        min={BPM_MIN}
        max={BPM_MAX}
        initialValue={bpm}
        onChange={val => Transport.set({ bpm: val })}
      />
    </div>
  );
};

export default Master;
