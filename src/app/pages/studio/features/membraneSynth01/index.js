import React, { useRef, memo, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import {
  Reverb,
  FeedbackDelay,
  Destination,
  Sequence,
  Distortion,
  PitchShift,
  Channel,
  Compressor,
  Gain,
  MembraneSynth,
  EQ3
} from 'tone';

//https://tone-demos.glitch.me/

import { onSequenceStep, setTrackConfig, stepsInitialState } from 'features/utils';

import ButtonGroup from 'componentLib/ButtonGroup';
import { Steps } from 'features/stepSequencer';
import { TrackControls } from 'features/trackControls';
import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import { TrackSteps } from '../../ui';
import EnvelopeControls from '../envelopeControls';
import CompressorControls from '../compressorControls';
import Eq3Controls from '../eq3Controls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const MembraneSynth01 = memo(({ trackId, trackConfig, defaultValues }) => {
  if (!trackId) return null;

  const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
    setTrackConfig(trackConfig)
  );

  const [data] = useImmer(() => stepsInitialState(numRows, numSteps));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

  const channel = useRef(new Channel(defaultValues));

  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.0001,
      release: 0.1
    })
  );

  const gain = useRef(new Gain(2));

  const eq3 = useRef(new EQ3({ low: 0, mid: -56, high: -54 }));

  const delay = useRef(
    new FeedbackDelay({
      delayTime: `${Math.floor(numSteps / 2)}n`,
      feedback: 1 / 3,
      wet: 0.0
    })
  );

  const distortion = useRef(new Distortion({ distortion: 1, oversample: '4x', wet: 0.0 }));

  const reverb = useRef(
    new Reverb({
      decay: 4,
      wet: 0.0,
      preDelay: 0.25
    })
  );

  const synth = useRef(
    new MembraneSynth({
      pitchDecay: 0.01,
      octaves: 6,
      oscillator: {
        type: 'square4'
      },
      envelope: {
        attack: 0.001,
        decay: 0.45,
        sustain: 0.1,
        release: 0.3
      }
    }).chain(channel.current, eq3.current, compressor.current, gain.current, Destination)
  );

  useEffect(() => {
    sequence.current = new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0);
    return () => {
      if (sequence.current) sequence.current.dispose();
    };
  }, []);

  const onTriggerAttackRelease = (notesToPlay, duration, time, velocity) => {
    if (!synth) return;
    synth.current.triggerAttackRelease(notesToPlay[0], duration, time, velocity);
  };

  const handleOnSequenceStep = (time, column) => {
    onSequenceStep(trackId, notes, numRows, numSteps, time, column, (notesToPlay, velocity) =>
      onTriggerAttackRelease(notesToPlay, noteInterval, time, velocity)
    );
  };

  return (
    <>
      <TrackControls trackId={trackId} channel={channel?.current} defaultValues={defaultValues} />
      <TrackSteps>
        <Steps
          trackId={trackId}
          numberOfSteps={trackConfig.numSteps ?? 16}
          steps={stepsRef?.current}
        />
      </TrackSteps>
      <TrackEffects trackId={trackId}>
        <EffectsGroup span={'1 / span 3'} title={'equaliser'}>
          <Eq3Controls trackId={trackId} eq3={eq3?.current} />
        </EffectsGroup>
        <EffectsGroup span={'5 / span 3'} title={'compressor'}>
          <CompressorControls trackId={trackId} compressor={compressor.current} />
        </EffectsGroup>
        {/*<ControlGroup orientation={'horizontal'} title={'effects'}>*/}
        {/*  <ButtonControl*/}
        {/*    trackId={trackId}*/}
        {/*    node={distortion?.current}*/}
        {/*    effectName={'distortion'}*/}
        {/*    label={'DIS'}*/}
        {/*    showPercentageValue*/}
        {/*  />*/}
        {/*  <ButtonControl*/}
        {/*    trackId={trackId}*/}
        {/*    node={reverb?.current}*/}
        {/*    effectName={'reverb'}*/}
        {/*    label={'REV'}*/}
        {/*    showPercentageValue*/}
        {/*  />*/}
        {/*  <ButtonControl*/}
        {/*    trackId={trackId}*/}
        {/*    node={delay?.current}*/}
        {/*    effectName={'delay'}*/}
        {/*    label={'DLY'}*/}
        {/*    showPercentageValue*/}
        {/*  />*/}
        {/*</ControlGroup>*/}
        <EffectsGroup span={'9 / span 4'} title={'envelope'}>
          <EnvelopeControls
            trackId={trackId}
            envelope={synth?.current?.envelope}
            defaultValues={{
              attack: 0.001,
              decay: 0.45,
              sustain: 0.1,
              release: 0.3
            }}
          />
        </EffectsGroup>
      </TrackEffects>
    </>
  );
});

export default MembraneSynth01;
