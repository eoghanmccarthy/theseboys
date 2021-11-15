import React, { memo, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Channel,
  Destination,
  Sequence,
  PolySynth,
  Synth,
  MembraneSynth,
  AMSynth,
  AmplitudeEnvelope
} from 'tone';
//Only instruments that extend the Monophonic class can be used with Tone.PolySynth
//AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth

import './styles.css';

import { onSequenceStep } from '../utils';
import { getSynth, getEffect } from 'utils/toneHelpers';
import newArray from 'utils/studioHelpers/newArray';

import Controls from '../../components/Controls';
import TrackControls from '../../components/trackControls';
import TrackSteps from '../../components/trackSteps';
import { TrackEffects, EffectsGroup } from '../../components/trackEffects';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const RhythmSynth = memo(
  forwardRef(
    ({ trackId, channel, instrument, notes, stepCount, steps, effects, controls }, ref) => {
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
        new PolySynth(Synth, {
          envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.1,
            release: 1.2
          }
        }).chain(channelRef.current, ...effectsChainRef.current, Destination)
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
      };

      return (
        <div id={trackId} className={'track'}>
          <TrackControls
            trackId={trackId}
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

export default RhythmSynth;

RhythmSynth.propTypes = {
  trackId: PropTypes.string.isRequired,
  instrument: PropTypes.shape({
    synth: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
  }).isRequired,
  stepCount: PropTypes.number.isRequired,
  channel: PropTypes.shape({
    pan: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    mute: PropTypes.bool.isRequired
  }).isRequired,
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
  steps: PropTypes.array.isRequired,
  effects: PropTypes.object.isRequired,
  controls: PropTypes.object.isRequired
};
