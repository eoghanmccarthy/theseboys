import React, { memo } from 'react';
import cx from 'classnames';

import './styles.css';

import { fromPercent, toPercent } from 'utils/studioHelpers';
import { VOL_MIN, VOL_MAX } from '../../utils/constants';

import { ChevronIcon } from '../icon';
import Button from '../button';
import { ButtonControl, ControllerGroup, SliderControl } from '../controllers';

const TrackControls = memo(({ trackId, trackNumber, channel, play }) => {
  if (!trackId || !channel) return null;

  return (
    <div id={`${trackId}-controls`} className={`track-controls`}>
      <ControllerGroup>
        {trackNumber ? (
          <Button id={`${trackId}-sample`} size={32} onClick={play}>
            {trackNumber}
          </Button>
        ) : null}
        <Button
          className={cx({ alert: channel.muted })}
          size={32}
          value={'off'}
          onClick={e => {
            const val = e.target.value;
            channel.set({ mute: val === 'off' });
            e.target.setAttribute('value', val === 'off' ? 'on' : 'off');
            e.target.classList.toggle('alert');
          }}
        >
          M
        </Button>
        <Button
          size={32}
          value={'off'}
          onClick={e => {
            const val = e.target.value;
            document
              .querySelector(`#${trackId} .step-sequencer`)
              .setAttribute('data-random', val === 'off' ? 'on' : 'off');
            e.target.setAttribute('value', val === 'off' ? 'on' : 'off');
            e.target.classList.toggle('alert');
          }}
        >
          R
        </Button>
        <SliderControl
          id={`${trackId}-random-value`}
          orient={'horizontal'}
          label={'RAN'}
          step={0.01}
          min={0.5}
          max={1}
          toFixed={2}
          initialValue={0.75}
          onChange={value => {
            document
              .querySelector(`#${trackId} .step-sequencer`)
              .setAttribute('data-random-value', value);
          }}
        />
      </ControllerGroup>
      <ControllerGroup>
        <ButtonControl
          id={`${trackId}-volume`}
          orient={'horizontal'}
          label={'VOL'}
          initialValue={toPercent([VOL_MIN, VOL_MAX], channel.get().volume) ?? 0}
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
          initialValue={channel.get().pan ?? 0}
          onChange={val => channel.set({ pan: val })}
        />
        <Button
          size={36}
          onClick={e => {
            document.querySelector(`#${trackId}-effects`)?.classList.toggle('hidden');
            e.target.classList.toggle('rotated');
          }}
        >
          <ChevronIcon width={'60%'} />
        </Button>
      </ControllerGroup>
    </div>
  );
});

export default TrackControls;
