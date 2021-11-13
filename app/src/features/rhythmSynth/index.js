import React, { memo, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  BitCrusher,
  Channel,
  Compressor,
  Destination,
  Distortion,
  EQ3,
  FeedbackDelay,
  Filter,
  Gain,
  Limiter,
  MembraneSynth,
  MetalSynth,
  NoiseSynth,
  Phaser,
  PitchShift,
  Reverb,
  Sequence,
  StereoWidener
} from 'tone';

import './styles.css';

import { getCurrentStepValues, onSequenceStep, toPercent } from '../utils';
import newArray from 'utils/studioHelpers/newArray';

import TrackControls from 'features/trackControls';
import TrackSteps from 'features/trackSteps';
import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import BitCrusherControls from 'features/bitCrusherControls';
import CompressorControls from 'features/compressorControls';
import EnvelopeControls from 'features/envelopeControls';
import Eq3Controls from 'features/eq3Controls';
import FilterControls from 'features/filterControls';
import DistortionControls from 'features/distortionControls';
import LimiterControls from 'features/limiterControls';
import ReverbControls from 'features/reverbControls';
import DelayControls from 'features/delayControls';
import PitchShiftControls from '../pitchShiftControls';
import StereoWidenerControls from '../stereoWidenerControls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const RhythmSynth = memo(
  forwardRef(
    (
      {
        songId,
        trackId,
        channel,
        instrument,
        synth,
        notes,
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

      const getSynth = (synth, options = {}) => {
        const synths = {
          MembraneSynth: new MembraneSynth(options),
          MetalSynth: new MetalSynth(options),
          NoiseSynth: new NoiseSynth(options)
        };
        return synths[synth];
      };

      const getEffect = (effect, options = {}) => {
        const effects = {
          BitCrusher: new BitCrusher(options),
          Compressor: new Compressor(options),
          Distortion: new Distortion(options),
          EQ3: new EQ3(options),
          FeedbackDelay: new FeedbackDelay(options),
          Filter: new Filter(options),
          Gain: new Gain(options),
          Limiter: new Limiter(options),
          Phaser: new Phaser(options),
          PitchShift: new PitchShift(options),
          Reverb: new Reverb(options),
          StereoWidener: new StereoWidener(options)
        };
        return effects[effect];
      };

      const sequenceRef = useRef();
      const channelRef = useRef(new Channel(channel ?? {}));

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
        sequenceRef.current = new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(
          0
        );
        return () => {
          if (sequenceRef?.current) sequenceRef.current.dispose();
        };
      }, []);

      const onTriggerAttackRelease = (notesToPlay, noteInterval, time, velocity) => {
        if (!synthRef?.current) return;
        if (synthRef.current.name !== 'NoiseSynth') {
          synthRef.current.triggerAttackRelease(notesToPlay[0], noteInterval, time, velocity);
        } else {
          synthRef.current.triggerAttackRelease(noteInterval, time, velocity);
        }
      };

      const handleOnSequenceStep = (time, column) => {
        onSequenceStep(trackId, notes, stepCount, time, column, (notesToPlay, velocity) =>
          onTriggerAttackRelease(notesToPlay, noteInterval, time, velocity)
        );
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
            channel={channelRef?.current}
            onSample={() => onTriggerAttackRelease(notes, noteInterval)}
          />
          <TrackSteps trackId={trackId} numSteps={stepCount} initialValue={steps} />
          <TrackEffects trackId={trackId}>
            {Object.entries(controls ?? {}).map(([group, value], i) => {
              return (
                <EffectsGroup key={i} span={value.span} title={group}>
                  {value.effects.map((name, i) => {
                    const node = effectsChainRef.current.find(effect => effect.name === name);
                    if (!node) return null;

                    switch (name) {
                      case 'BitCrusher':
                        return <BitCrusherControls key={i} trackId={trackId} node={node} />;
                      case 'Compressor':
                        return <CompressorControls key={i} trackId={trackId} node={node} />;
                      case 'Distortion':
                        return <DistortionControls key={i} trackId={trackId} node={node} />;
                      case 'EQ3':
                        return <Eq3Controls key={i} trackId={trackId} node={node} />;
                      case 'FeedbackDelay':
                        return <DelayControls key={i} trackId={trackId} node={node} />;
                      case 'Filter':
                        return <FilterControls key={i} trackId={trackId} node={node} />;
                      case 'Limiter':
                        return <LimiterControls key={i} trackId={trackId} node={node} />;
                      case 'PitchShift':
                        return <PitchShiftControls key={i} trackId={trackId} node={node} />;
                      case 'Reverb':
                        return <ReverbControls key={i} trackId={trackId} node={node} />;
                      case 'StereoWidener':
                        return <StereoWidenerControls key={i} trackId={trackId} node={node} />;
                      default:
                        return null;
                    }
                  })}
                </EffectsGroup>
              );
            })}
            <EffectsGroup span={'17 / span 4'} title={'envelope'}>
              <EnvelopeControls trackId={trackId} node={synthRef?.current?.envelope} />
            </EffectsGroup>
          </TrackEffects>
        </div>
      );
    }
  )
);

export default RhythmSynth;

RhythmSynth.propTypes = {
  songId: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  instrument: PropTypes.string.isRequired,
  stepCount: PropTypes.number.isRequired
};
