import React, { memo, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Channel, Destination, Sequence } from 'tone';

import { isUndefined, isArray } from 'utils/helpers/typeCheck';

import { channelTypes, instrumentTypes, notesTypes, stepsTypes } from '../../utils/types';

import { getSynth, getEffect } from 'utils/toneHelpers';
import { newArray, onSequenceStep } from 'utils/studioHelpers';

import { ControlHandler } from '../controls';
import Track from '../Track';
import TrackControls from '../TrackControls';
import TrackSteps from '../TrackSteps';
import { TrackEffects, EffectsGroup } from '../trackEffects';

const SnareTrack = memo(
  forwardRef(
    (
      { trackId, trackNumber, channel, instrument, notes, stepCount, steps, effects, controls },
      ref
    ) => {
      const noteInterval = `${stepCount}n`;
      const noteIndices = newArray(stepCount);
      const isNoise = instrument?.synth === 'NoiseSynth';

      const handleOnSequenceStep = (time, column) => {
        onSequenceStep(trackId, notes, stepCount, time, column, (notesToPlay, velocity) =>
          onTriggerAttackRelease(notesToPlay, noteInterval, time, velocity)
        );
      };

      const channelRef = useRef(new Channel(channel ?? {}));
      // Do i need to pass in time here?
      //https://github.com/Tonejs/Tone.js/issues/956
      const sequenceRef = useRef(
        new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0)
      );
      const effectsChainRef = useRef(
        Object.entries(effects ?? {}).map(([effect, options]) => getEffect(effect, options))
      );
      const synthRef = useRef(
        getSynth(instrument.synth, instrument.options).chain(
          channelRef.current,
          ...effectsChainRef.current,
          Destination
        )
      );

      useEffect(() => {
        return () => {
          if (channelRef.current) {
            channelRef.current.dispose();
          }

          if (sequenceRef.current) {
            sequenceRef.current.dispose();
          }

          if (synthRef.current) {
            synthRef.current.dispose();
          }

          if (isArray(effectsChainRef.current)) {
            effectsChainRef.current.forEach(effect => effect.dispose());
          }
        };
      }, []);

      const onTriggerAttackRelease = (notesToPlay, ...rest) => {
        if (!synthRef.current) {
          return;
        }

        if (!isNoise) {
          synthRef.current.triggerAttackRelease(notesToPlay[0], ...rest);
        } else {
          synthRef.current.triggerAttackRelease(...rest);
        }
      };

      return (
        <Track trackId={trackId}>
          <TrackControls
            trackId={trackId}
            trackNumber={trackNumber}
            channel={channelRef.current}
            play={() => onTriggerAttackRelease(notes, noteInterval)}
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

                    return <ControlHandler key={i} trackId={trackId} name={name} node={node} />;
                  })}
                </EffectsGroup>
              );
            })}
            <EffectsGroup span={'17 / span 4'} title={'envelope'}>
              <ControlHandler
                trackId={trackId}
                name={'Envelope'}
                node={synthRef.current?.envelope}
              />
            </EffectsGroup>
          </TrackEffects>
        </Track>
      );
    }
  )
);

export default SnareTrack;

SnareTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  trackNumber: PropTypes.number,
  instrument: instrumentTypes,
  stepCount: PropTypes.number.isRequired,
  channel: channelTypes,
  notes: notesTypes,
  steps: stepsTypes,
  effects: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};
