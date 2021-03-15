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
  forwardRef(({ index, trackId, initialValue, ...rest }, ref) => {
    const dispatch = useDispatch();
    const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
      setTrackConfig({ numSteps: initialValue.numSteps, notes: initialValue.notes })
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
      Object.entries(initialValue?.instrument?.effects ?? {}).map(([e, o]) => getEffect(e, o))
    );
    const synth = useRef(
      getSynth(initialValue.synth, initialValue?.instrument?.synth).chain(
        channel.current,
        ...effectsChain.current,
        Destination
      )
    );

    useEffect(() => {
      sequence.current = new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0);
    }, []);

    useEffect(() => {
      return () => {
        effectsChain.current.forEach(effect => effect.dispose());
        synth.current.dispose();
        sequence.current.dispose();
        channel.current.dispose();
      };
    }, []);

    const onTriggerAttackRelease = (notesToPlay, duration, time, velocity) => {
      if (!synth?.current) return;
      if (initialValue.synth !== 'NoiseSynth') {
        synth.current.triggerAttackRelease(notesToPlay[0], duration, time, velocity);
      } else {
        synth.current.triggerAttackRelease(duration, time, velocity);
      }
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
            data: channel.current.get()
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
        dispatch({
          type: 'track/SAVE_EFFECTS',
          payload: {
            id: trackId,
            data: effectsChain.current
          }
        });
      }
    }));

    return (
      <div id={trackId} className={'track'}>
        <TrackControls index={index} trackId={trackId} channel={channel?.current} />
        <TrackSteps trackId={trackId} numSteps={16} initialValue={initialValue?.steps} />
        <TrackEffects trackId={trackId}>
          {Object.entries(initialValue?.controls ?? {}).map(([group, value], i) => {
            return (
              <EffectsGroup key={i} span={value.span} title={group}>
                {value.effects.map((name, i) => {
                  const effect = effectsChain.current.find(effect => effect.name === name);
                  if (!effect) return;
                  if (name === 'EQ3') {
                    return <Eq3Controls key={i} trackId={trackId} eq3={effect} />;
                  } else if (name === 'Compressor') {
                    return <CompressorControls key={i} trackId={trackId} compressor={effect} />;
                  } else if (name === 'Filter') {
                    return <FilterControls key={i} trackId={trackId} filter={effect} />;
                  } else if (name === 'Distortion') {
                    return <DistortionControls key={i} trackId={trackId} distortion={effect} />;
                  } else if (name === 'Reverb') {
                    return <ReverbControls key={i} trackId={trackId} reverb={effect} />;
                  } else if (name === 'FeedbackDelay') {
                    return <DelayControls key={i} trackId={trackId} delay={effect} />;
                  }
                })}
              </EffectsGroup>
            );
          })}
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
