import React, { memo, forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { string } from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Channel,
  MembraneSynth,
  MetalSynth,
  NoiseSynth,
  Sequence,
  Reverb,
  FeedbackDelay,
  Distortion,
  PitchShift,
  Compressor,
  Gain,
  EQ3,
  Filter,
  Destination
} from 'tone';

import './styles.css';

import { getCurrentStepValues, onSequenceStep, setTrackConfig, toPercent } from '../utils';
import { VOL_MAX, VOL_MIN } from '../utils/constants';

import TrackControls from 'features/trackControls';
import TrackSteps from 'features/trackSteps';
import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import CompressorControls from 'features/compressorControls';
import EnvelopeControls from 'features/envelopeControls';
import Eq3Controls from 'features/eq3Controls';
import FilterControls from 'features/filterControls';
import DistortionControls from 'features/distortionControls';
import ReverbControls from 'features/reverbControls';
import DelayControls from 'features/delayControls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const Track = memo(
  forwardRef(({ index, trackId, config, initialValue, ...rest }, ref) => {
    const dispatch = useDispatch();
    const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
      setTrackConfig(config)
    );

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
        EQ3: new EQ3(options),
        Gain: new Gain(options),
        Reverb: new Reverb(options),
        FeedbackDelay: new FeedbackDelay(options),
        Distortion: new Distortion(options),
        PitchShift: new PitchShift(options),
        Compressor: new Compressor(options),
        Filter: new Filter(options)
      };
      return effects[effect];
    };

    const sequence = useRef();
    const channel = useRef(new Channel(initialValue?.channel ?? {}));
    const effectsChain = useRef(
      Object.entries(initialValue?.instrument?.effects).map(([e, o]) => getEffect(e, o))
    );
    const [effectsChainIds] = useState(effectsChain.current.map(effect => effect.name));
    const synth = useRef(
      getSynth(config.synth, initialValue?.instrument?.synth).chain(
        ...effectsChain.current,
        Destination
      )
    );

    useEffect(() => {
      sequence.current = new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0);
      return () => {
        if (sequence?.current) sequence.current.dispose();
      };
    }, []);

    const onTriggerAttackRelease = (notesToPlay, duration, time, velocity) => {
      if (!synth?.current) return;
      synth.current.triggerAttackRelease(notesToPlay[0], duration, time, velocity);
    };

    const handleOnSequenceStep = (time, column) => {
      onSequenceStep(trackId, notes, numRows, numSteps, time, column, (notesToPlay, velocity) =>
        onTriggerAttackRelease(notesToPlay, noteInterval, time, velocity)
      );
    };

    useImperativeHandle(ref, () => ({
      save() {
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
        dispatch({
          type: 'track/SAVE_SYNTH',
          payload: {
            id: trackId,
            data: synth.current.get()
          }
        });
      }
    }));

    return (
      <div id={trackId} className={'track'}>
        <TrackControls index={index} trackId={trackId} channel={channel?.current} />
        <TrackSteps trackId={trackId} numSteps={16} initialValue={initialValue?.steps} />
        <TrackEffects trackId={trackId}>
          {effectsChain.current.map((effect, i) => {
            const { name } = effect;
            if (name === 'EQ3') {
              return (
                <EffectsGroup key={i} span={'1 / span 3'} title={'equaliser'}>
                  <Eq3Controls trackId={trackId} eq3={effect} />
                </EffectsGroup>
              );
            } else if (name === 'Compressor') {
              return (
                <EffectsGroup key={i} span={'5 / span 3'} title={'compressor'}>
                  <CompressorControls trackId={trackId} compressor={effect} />
                </EffectsGroup>
              );
            } else if (name === 'Filter') {
              return (
                <EffectsGroup key={i} span={'5 / span 3'} title={'filter'}>
                  <FilterControls trackId={trackId} filter={effect} />
                </EffectsGroup>
              );
            }
          })}
          {effectsChainIds.includes('Distortion') ||
          effectsChainIds.includes('Reverb') ||
          effectsChainIds.includes('FeedbackDelay') ? (
            <EffectsGroup span={'5 / span 3'} title={'effects'}>
              {effectsChain.current.map((effect, i) => {
                const { name } = effect;
                if (name === 'Distortion') {
                  return <DistortionControls key={i} trackId={trackId} distortion={effect} />;
                } else if (name === 'Reverb') {
                  return <ReverbControls key={i} trackId={trackId} reverb={effect} />;
                } else if (name === 'FeedbackDelay') {
                  return <DelayControls key={i} trackId={trackId} delay={effect} />;
                }
              })}
            </EffectsGroup>
          ) : null}
          <EffectsGroup span={'9 / span 4'} title={'envelope'}>
            <EnvelopeControls trackId={trackId} envelope={synth?.current?.envelope} />
          </EffectsGroup>
        </TrackEffects>
      </div>
    );
  })
);

export default Track;

Track.propTypes = {
  trackId: string.isRequired
};
