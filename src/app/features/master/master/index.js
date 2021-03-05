import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { Destination, Transport } from 'tone';

import './styles.css';

import Button from 'componentLib/Button';
import ButtonGroup from 'componentLib/ButtonGroup';
import useMasterContext from '../useMasterContext';
import { ButtonControl, SliderControl } from 'pages/studio/ui';

const trackId = 'master';

const Master = () => {
  const dispatch = useDispatch();
  const { bpm, volume } = useSelector(state => state.app.master);
  const { play, stop, record } = useMasterContext('<Master>');

  useEffect(() => {
    Destination.set({ volume });
    Transport.set({ bpm });
  }, []);

  return (
    <div
      id={'master'}
      className={'master'}
      data-playback={'stopped'}
      data-recorder={'off'}
      data-bpm={120}
      data-volume={75}
    >
      <button
        onClick={() =>
          dispatch({
            type: 'master/SAVE',
            payload: { bpm: Transport.get().bpm, volume: Destination.get().volume }
          })
        }
      >
        save
      </button>
      <SliderControl
        node={Destination}
        param={'volume'}
        trackId={trackId}
        effectName={'volume'}
        orientation={'horizontal'}
        label={'VOL'}
        step={1}
        max={20}
        min={-60}
        showPercentageValue
      />
      <ButtonGroup>
        <Button className={'record-button'} onClick={record} />
        <Button className={cx('playback-button play')} onClick={play} />
        <Button className={cx('playback-button stop')} onClick={stop} />
      </ButtonGroup>
      <ButtonControl
        node={Transport}
        param={'bpm'}
        trackId={trackId}
        effectName={'bpm'}
        orientation={'horizontal'}
        label={'BPM'}
        step={1}
        min={60}
        max={240}
        toFixed={0}
      />
    </div>
  );
};

export default Master;
