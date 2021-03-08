import React, { useRef, memo, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import {
  Reverb,
  FeedbackDelay,
  Destination,
  Sequence,
  Draw,
  Distortion,
  PitchShift,
  Channel,
  Compressor,
  Gain,
  NoiseSynth,
  EQ3,
  Filter
} from 'tone';

//https://tone-demos.glitch.me/

import { onSequenceStep, setTrackConfig, stepsInitialState } from 'features/utils';

import { TrackControls } from 'features/trackControls';
import { TrackSteps } from 'features/trackSteps';
import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import EnvelopeControls from 'features/envelopeControls';
import Eq3Controls from '../eq3Controls';
import FilterControls from '../filterControls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const NoiseSequencer01 = memo(({ trackId, config = {}, defaultValues }) => {
  if (!trackId) return null;

  const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
    setTrackConfig(config)
  );

  const [data] = useImmer(() => stepsInitialState(numRows, numSteps));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

  const channel = useRef(new Channel(defaultValues));

  const eq3 = useRef(new EQ3({ low: -60, mid: -48, high: 12 }));

  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.3,
      release: 0.1
    })
  );

  const distortion = useRef(new Distortion({ distortion: 1, oversample: '4x', wet: 0.6 }));

  const filter = useRef(new Filter({ Q: 2, frequency: 10000 }));

  const reverb = useRef(
    new Reverb({
      decay: 4,
      wet: 0.2,
      preDelay: 0.25
    })
  );

  const gain = useRef(new Gain(2));

  const synth = useRef(
    new NoiseSynth({
      volume: -8,
      noise: {
        type: 'white',
        playbackRate: 5
      }
    }).chain(channel.current, eq3.current, filter.current, Destination)
  );

  useEffect(() => {
    sequence.current = new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0);
    return () => {
      if (sequence.current) sequence.current.dispose();
    };
  }, []);

  const onTriggerAttackRelease = (duration, time, velocity) => {
    if (!synth) return;
    synth.current.triggerAttackRelease(duration, time, velocity);
  };

  const handleOnSequenceStep = (time, column) => {
    onSequenceStep(trackId, notes, numRows, numSteps, time, column, (notesToPlay, velocity) =>
      onTriggerAttackRelease(noteInterval, time, velocity)
    );
  };

  return (
    <>
      <TrackControls trackId={trackId} channel={channel?.current} defaultValues={defaultValues} />
      <TrackSteps
        trackId={trackId}
        numSteps={config?.numSteps ?? 16}
        initialValue={stepsRef?.current}
      />
      <TrackEffects trackId={trackId}>
        <EffectsGroup span={'1 / span 3'} title={'equaliser'}>
          <Eq3Controls trackId={trackId} eq3={eq3?.current} />
        </EffectsGroup>
        <EffectsGroup span={'5 / span 3'} title={'filter'}>
          <FilterControls trackId={trackId} filter={filter?.current} />
        </EffectsGroup>
        {/*<ControlGroup orientation={'horizontal'} title={'effects'}>*/}
        {/*  <ButtonControl*/}
        {/*    showPercentageValue*/}
        {/*    node={distortion?.current}*/}
        {/*    trackId={trackId}*/}
        {/*    effectName={'distortion'}*/}
        {/*    label={'DIS'}*/}
        {/*  />*/}
        {/*  <ButtonControl*/}
        {/*    node={delay?.current}*/}
        {/*    trackId={trackId}*/}
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
              decay: 0.3,
              sustain: 0,
              release: 0.3
            }}
          />
        </EffectsGroup>
      </TrackEffects>
    </>
  );
});

export default NoiseSequencer01;
