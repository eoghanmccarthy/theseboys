import React, { memo, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Channel,
  Destination,
  Sequence,
  PolySynth as TonePolySynth,
  DuoSynth,
  Synth,
  MembraneSynth,
  AMSynth,
  AmplitudeEnvelope,
  Chorus,
  Gate,
  Limiter,
  FeedbackDelay
} from 'tone';
//Only instruments that extend the Monophonic class can be used with Tone.PolySynth
//AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, Synth

import { channelTypes, instrumentTypes, notesTypes, stepsTypes } from '../../utils/types';

import { getSynth, getEffect } from 'utils/toneHelpers';
import { newArray, onSequenceStep } from 'utils/studioHelpers';

import { ControlHandler } from '../controls';
import Track from '../Track';
import TrackControls from '../TrackControls';
import TrackSteps from '../TrackSteps';
import { TrackEffects, EffectsGroup } from '../trackEffects';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

// const delay = useRef(
//     new FeedbackDelay({
//       delayTime: `${Math.floor(numCols / 2)}n`,
//       feedback: 1 / 3,
//       wet: 0.2
//     })
// );

const PolySynthTrack = memo(
  forwardRef(
    (
      { trackId, trackNumber, channel, instrument, notes, stepCount, steps, effects, controls },
      ref
    ) => {
      const noteInterval = `${stepCount}n`;
      const noteIndices = newArray(stepCount);
      const numRows = notes.length;

      const handleOnSequenceStep = (time, column) => {
        onSequenceStep(trackId, notes, stepCount, time, column, (notesToPlay, velocity) =>
          onTriggerAttackRelease(notesToPlay, noteInterval, time, velocity)
        );
      };

      const channelRef = useRef(new Channel(channel ?? {}));
      const sequenceRef = useRef(
        new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0)
      );
      const gateRef = useRef(new Gate(-40, 0.2));
      const limiterRef = useRef(new Limiter(0));
      const chorusRef = useRef(new Chorus({ frequency: 4, delayTime: 2.5, depth: 0.5, wet: 0.6 }));
      const effectsChainRef = useRef(
        Object.entries(effects ?? {}).map(([effect, options]) => getEffect(effect, options))
      );
      const synthRef = useRef(
        new TonePolySynth(Synth, {
          ...instrument.options,
          maxPolyphony: numRows
        }).chain(
          ...effectsChainRef.current,
          chorusRef.current,
          gateRef.current,
          limiterRef.current,
          channelRef.current,
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

        synthRef.current.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);
        //synthRef.current.releaseAll();
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

export default PolySynthTrack;

PolySynthTrack.propTypes = {
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
