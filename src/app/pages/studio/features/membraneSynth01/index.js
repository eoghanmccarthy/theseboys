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

import { TrackControls } from 'features/trackControls';
import { TrackSteps } from 'features/trackSteps';
import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import EnvelopeControls from 'features/envelopeControls';
import CompressorControls from 'features/compressorControls';
import Eq3Controls from 'features/eq3Controls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const MembraneSynth01 = memo(({ trackId, config = {}, initialValue = {} }) => {
  if (!trackId) return null;

  const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
    setTrackConfig(config)
  );

  const [data] = useImmer(() => stepsInitialState(numRows, numSteps));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

  const channel = useRef(new Channel());
  const compressor = useRef(new Compressor());
  const gain = useRef(new Gain(2));
  const eq3 = useRef(new EQ3());

  const synth = useRef(
    new MembraneSynth({
      pitchDecay: 0.01,
      octaves: 6,
      oscillator: {
        type: 'square4'
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
      <TrackControls
        trackId={trackId}
        channel={channel?.current}
        initialValue={initialValue?.channel}
      />
      <TrackSteps
        trackId={trackId}
        numSteps={config?.numSteps ?? 16}
        initialValue={stepsRef?.current}
      />
      <TrackEffects trackId={trackId}>
        <EffectsGroup span={'1 / span 3'} title={'equaliser'}>
          <Eq3Controls trackId={trackId} eq3={eq3?.current} initialValue={initialValue?.eq3} />
        </EffectsGroup>
        <EffectsGroup span={'5 / span 3'} title={'compressor'}>
          <CompressorControls
            trackId={trackId}
            compressor={compressor?.current}
            initialValue={initialValue?.compressor}
          />
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
            initialValue={initialValue?.synth?.envelope}
          />
        </EffectsGroup>
      </TrackEffects>
    </>
  );
});

export default MembraneSynth01;
