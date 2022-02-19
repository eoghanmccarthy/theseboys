import React, { memo, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sequence } from 'tone';

import useEventListener from 'utils/hooks/useEventListener';
import useSound from 'utils/hooks/useSound';

import { channelTypes, instrumentTypes, notesTypes, stepsTypes } from '../../utils/types';

import { newArray } from 'utils/studioHelpers';
import { onSequenceStep } from '../stepSequencer/utils';

import { ControlHandler } from '../controls';
import Track from '../trackContainer';
import TrackControls from '../trackControls';
import TrackSteps from '../trackSteps';
import { TrackEffects, EffectsGroup } from '../trackEffects';

const StudioTrack = memo(
  forwardRef(
    ({ index, trackId, channel, instrument, notes, stepCount, steps, effects, controls }, ref) => {
      const noteInterval = `${stepCount}n`;
      const noteIndices = newArray(stepCount);

      useEventListener(e => {
        if (parseInt(e.key) === index + 1) {
          if (e.shiftKey) {
            // const steps = document.querySelectorAll(`.t00${e.key}-step`);
            // if (!e.altKey) {
            //   steps.forEach(step => step.setAttribute('value', 'on'));
            // } else {
            //   steps.forEach(step => step.setAttribute('value', 'off'));
            // }
          } else {
            document.querySelector(`#${trackId}`)?.scrollIntoView();
            //document.querySelector(`#${trackId}-sample`)?.focus();
          }
        }
      });

      const sound = useSound(channel, instrument, effects);

      const handleOnSequenceStep = (time, column) => {
        onSequenceStep(trackId, notes, stepCount, time, column, (notesToPlay, velocity) =>
          sound.trigger(notesToPlay, noteInterval, time, velocity)
        );
      };

      /* Sequencer */
      const sequenceRef = useRef(
        new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0)
      );

      useEffect(() => {
        return () => {
          if (sequenceRef.current) {
            sequenceRef.current.dispose();
          }
        };
      }, []);

      return (
        <Track trackId={trackId}>
          <TrackControls trackId={trackId} trackNumber={index + 1} channel={sound.channel} />
          <TrackSteps trackId={trackId} numSteps={stepCount} initialValue={steps} />
          <TrackEffects trackId={trackId}>
            {Object.entries(controls ?? {}).map(([group, value], i) => {
              return (
                <EffectsGroup key={i} span={value.span} title={group}>
                  {value.effects.map((name, i) => {
                    const node = sound.effects.find(effect => effect.name === name);

                    if (!node) {
                      return null;
                    }

                    return <ControlHandler key={i} trackId={trackId} name={name} node={node} />;
                  })}
                </EffectsGroup>
              );
            })}
            <EffectsGroup span={'17 / span 4'} title={'envelope'}>
              <ControlHandler trackId={trackId} name={'Envelope'} node={sound.synth?.envelope} />
            </EffectsGroup>
          </TrackEffects>
        </Track>
      );
    }
  )
);

export default StudioTrack;

StudioTrack.propTypes = {
  trackId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  instrument: instrumentTypes,
  stepCount: PropTypes.number.isRequired,
  channel: channelTypes,
  notes: notesTypes,
  steps: stepsTypes,
  effects: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};
