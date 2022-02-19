import React, { memo, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sequence } from 'tone';
//Only instruments that extend the Monophonic class can be used with Tone.PolySynth
//AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, Synth

import useEventListener from 'utils/hooks/useEventListener';
import useSound from 'utils/hooks/useSound';

import { channelTypes, instrumentTypes, notesTypes, stepsTypes } from '../../utils/types';

import { newArray, onSequenceStep } from 'utils/studioHelpers';

import Track from '../trackContainer';
import TrackSteps from '../trackSteps';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

// const delay = useRef(
//     new FeedbackDelay({
//       delayTime: `${Math.floor(numCols / 2)}n`,
//       feedback: 1 / 3,
//       wet: 0.2
//     })
// );

const PolyTrack = memo(
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
          <TrackSteps trackId={trackId} numSteps={stepCount} initialValue={steps} />
        </Track>
      );
    }
  )
);

export default PolyTrack;

PolyTrack.propTypes = {
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
