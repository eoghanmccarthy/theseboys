import React, { memo, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Channel, Destination, Sequence } from 'tone';

import { isUndefined, isArray } from 'utils/helpers/typeCheck';

import './styles.css';

import { getCurrentStepValues, onSequenceStep, toPercent } from '../../features/utils';
import { getSynth, getEffect } from 'utils/toneHelpers';
import newArray from 'utils/studioHelpers/newArray';

import Controls from '../Controls';
import TrackControls from '../trackControls';
import TrackSteps from '../trackSteps';
import { TrackEffects, EffectsGroup } from '../trackEffects';

const Track = memo(
  forwardRef(
    (
      {
        songId,
        trackId,
        trackNumber,
        channel,
        instrument,
        notes,
        synth,
        stepCount,
        steps,
        effects,
        controls,
        ...rest
      },
      ref
    ) => {
      const dispatch = useDispatch();
      const noteInterval = `${stepCount}n`;
      const noteIndices = newArray(stepCount);

      const handleOnSequenceStep = (time, column) => {
        onSequenceStep(trackId, notes, stepCount, time, column, (notesToPlay, velocity) =>
          onTriggerAttackRelease(notesToPlay, noteInterval, time, velocity)
        );
      };

      const channelRef = useRef(new Channel(channel ?? {}));
      const sequenceRef = useRef(
        new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0)
      );
      const effectsChainRef = useRef(
        Object.entries(effects ?? {}).map(([effect, options]) => getEffect(effect, options))
      );
      const synthRef = useRef(
        getSynth(instrument, synth).chain(
          channelRef.current,
          ...effectsChainRef.current,
          Destination
        )
      );

      useEffect(() => {
        return () => {
          // if (channelRef.current) {
          //   channelRef.current.dispose();
          // }
          //
          // if (sequenceRef.current) {
          //   sequenceRef.current.dispose();
          // }
          //
          // if (effectsChainRef.current) {
          //   effectsChainRef.current.forEach(effect => effect.dispose());
          // }
          //
          // if (synthRef.current) {
          //   synthRef.current.dispose();
          // }
        };
      }, []);

      const onTriggerAttackRelease = (notesToPlay, noteInterval, time, velocity) => {
        if (!synthRef.current) {
          return;
        }

        if (isUndefined(notesToPlay)) {
          synthRef.current.triggerAttackRelease(noteInterval, time, velocity);
        } else {
          const note = notesToPlay[0];
          synthRef.current.triggerAttackRelease(note, noteInterval, time, velocity);
        }
      };

      useImperativeHandle(ref, () => ({
        save() {
          dispatch({
            type: 'song/SAVE_TRACK',
            payload: {
              songId,
              trackId,
              data: {
                channel: channelRef.current.get(),
                steps: getCurrentStepValues(trackId),
                synth: synthRef.current.get(),
                effects: effectsChainRef.current
              }
            }
          });
        }
      }));

      return (
        <div id={trackId} className={'track'}>
          <TrackControls
            trackId={trackId}
            trackNumber={trackNumber}
            channel={channelRef.current}
            onSample={() => onTriggerAttackRelease(notes, noteInterval)}
          />
          <TrackSteps trackId={trackId} numSteps={stepCount} initialValue={steps} />
          <TrackEffects trackId={trackId}>
            {Object.entries(controls ?? {}).map(([group, value], i) => {
              return (
                <EffectsGroup key={i} span={value.span} title={group}>
                  {value.effects.map((name, i) => {
                    const node = effectsChainRef.current.find(effect => effect.name === name);

                    if (!node) {
                      return null;
                    }

                    return <Controls key={i} trackId={trackId} name={name} node={node} />;
                  })}
                </EffectsGroup>
              );
            })}
            <EffectsGroup span={'17 / span 4'} title={'envelope'}>
              <Controls trackId={trackId} name={'Envelope'} node={synthRef.current?.envelope} />
            </EffectsGroup>
          </TrackEffects>
        </div>
      );
    }
  )
);

export default Track;

Track.propTypes = {
  songId: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
  instrument: PropTypes.string.isRequired,
  stepCount: PropTypes.number.isRequired
};
