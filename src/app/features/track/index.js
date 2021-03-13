import React, { memo, forwardRef, useImperativeHandle, useRef } from 'react';
import { string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Channel } from 'tone';

import './styles.css';

import { getCurrentStepValues, toPercent } from '../utils';
import { VOL_MAX, VOL_MIN } from '../utils/constants';

import { MembraneSynthA, MetalSynthA, NoiseSynthA, NoiseSynthB } from '../instruments';
import TrackControls from 'features/trackControls';
import TrackSteps from 'features/trackSteps';

const Track = memo(
  forwardRef(({ index, trackId, instrument, defaultValue, ...rest }, ref) => {
    const store = useSelector(state => state.app);
    const stored = store.tracks[trackId];

    const dispatch = useDispatch();
    const channel = useRef(new Channel());

    useImperativeHandle(ref, () => ({
      save() {
        if (!channel?.current) return;
        dispatch({
          type: 'track/SAVE_CHANNEL',
          payload: {
            id: trackId,
            data: {
              ...channel.current.get(),
              volume: toPercent([VOL_MIN, VOL_MAX], channel.current.get().volume)
            }
          }
        });
        dispatch({
          type: 'track/SAVE_STEPS',
          payload: {
            id: trackId,
            data: getCurrentStepValues(trackId)
          }
        });
      }
    }));

    const instruments = {
      tom: MembraneSynthA,
      bell: MetalSynthA,
      cymbal: NoiseSynthA,
      hat: NoiseSynthB
    };

    const SOUND = instruments[instrument];

    return (
      <div id={trackId} className={'track'}>
        <TrackControls
          index={index}
          trackId={trackId}
          channel={channel?.current}
          defaultValue={defaultValue.channel}
        />
        <TrackSteps trackId={trackId} numSteps={16} defaultValue={defaultValue.steps} />
        {SOUND ? (
          <SOUND
            trackId={trackId}
            initialValue={defaultValue.instrument}
            channel={channel?.current}
            {...rest}
          />
        ) : null}
      </div>
    );
  })
);

export default Track;

Track.propTypes = {
  trackId: string.isRequired,
  instrument: string.isRequired
};
