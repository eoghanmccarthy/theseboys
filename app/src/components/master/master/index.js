import React from 'react';
import { Destination, Transport } from 'tone';

import './index.css';

import { BPM_MIN, BPM_MAX, VOL_MIN, VOL_MAX } from '../../../utils/constants';
import { fromPercent, toPercent } from 'utils/studioHelpers';

import Button from 'components/button';
import { CircleIcon, PlayIcon, SquareIcon } from 'components/icon';
import useMasterContext from '../useMasterContext';
import { ButtonControl, ControllerGroup, SliderControl } from '../../controllers';

const Master = ({ volume, bpm }) => {
  const { play, stop, record } = useMasterContext('<Master>');

  return (
    <section id={'master'} data-playback={'stopped'} data-recorder={'off'}>
      <div className={'master__status'}>
        <div id={'beat'} />
      </div>
      <div className={'master__controls'}>
        <SliderControl
          id={'master-volume'}
          orient={'horizontal'}
          label={'VOL'}
          step={1}
          max={100}
          initialValue={toPercent([VOL_MIN, VOL_MAX], volume) ?? 0}
          onChange={val => Destination.set({ volume: fromPercent([VOL_MIN, VOL_MAX], val) })}
        />
        <ControllerGroup id={'playback-controls'}>
          <Button className={'playback record'} title={'record'} value={'off'} onClick={record}>
            <CircleIcon />
          </Button>
          <Button className={'playback play'} title={'play'} value={'off'} onClick={play}>
            <PlayIcon />
          </Button>
          <Button className={'playback stop'} title={'stop'} value={'on'} onClick={stop}>
            <SquareIcon />
          </Button>
        </ControllerGroup>
        <ButtonControl
          id={'master-bpm'}
          orient={'horizontal'}
          label={'BPM'}
          min={BPM_MIN}
          max={BPM_MAX}
          initialValue={bpm ?? 120}
          onChange={val => Transport.set({ bpm: val })}
        />
      </div>
    </section>
  );
};

export default Master;
