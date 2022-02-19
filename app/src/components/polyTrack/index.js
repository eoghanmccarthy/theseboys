import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
//Only instruments that extend the Monophonic class can be used with Tone.PolySynth
//AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, Synth

import { useEventListener, useSound } from 'hooks';

import { channelTypes, instrumentTypes, notesTypes, stepsTypes } from '../../utils/types';

import StepSequencer from '../stepSequencer';

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
      const sound = useSound(channel, instrument, effects);

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

      return (
        <StepSequencer
          trackId={trackId}
          notes={notes}
          stepCount={stepCount}
          steps={steps}
          onStep={sound.trigger}
        />
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
