import React, { useRef, memo, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import {
  Destination,
  Sequence,
  Draw,
  Distortion,
  PitchShift,
  Channel,
  Compressor,
  Gain,
  Filter,
  NoiseSynth,
  EQ3
} from 'tone';

//https://tone-demos.glitch.me/

import { onSequenceStep, setTrackConfig, stepsInitialState } from 'features/utils';

import ButtonGroup from 'componentLib/ButtonGroup';
import { Steps } from 'features/stepSequencer';
import { TrackControls } from 'features/trackControls';
import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import { HitButton, TrackSteps } from '../../ui';
import EnvelopeControls from '../envelopeControls';
import FilterControls from '../filterControls';
import Eq3Controls from '../eq3Controls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const NoiseSequencer02 = memo(({ trackId, trackConfig, channelDefaults }) => {
  if (!trackId) return null;

  const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
    setTrackConfig(trackConfig)
  );

  const [data] = useImmer(() => stepsInitialState(numRows, numSteps));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

  const channel = useRef(new Channel(channelDefaults));

  const eq3 = useRef(new EQ3({ low: -60, mid: -60, high: 7 }));

  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.3,
      release: 0.1
    })
  );

  const filter = useRef(new Filter({ Q: 2, frequency: 8000 }));

  const distortion = useRef(new Distortion({ distortion: 1, oversample: '4x', wet: 0.6 }));

  const gain = useRef(new Gain(2));

  const synth = useRef(
    new NoiseSynth({
      volume: -14,
      envelope: {
        attack: 0.01,
        decay: 0.15,
        release: 0.06
      }
    }).chain(channel.current, eq3.current, filter.current, gain.current, Destination)
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
      <TrackControls trackId={trackId} channel={channel?.current} />
      <TrackSteps>
        <ButtonGroup>
          <HitButton trackId={trackId} onClick={() => onTriggerAttackRelease(noteInterval)} />
        </ButtonGroup>
        <Steps trackId={trackId} steps={stepsRef?.current} />
      </TrackSteps>
      <TrackEffects>
        <EffectsGroup span={'1 / span 3'} title={'equaliser'}>
          <Eq3Controls trackId={trackId} eq3={eq3?.current} />
        </EffectsGroup>
        <EffectsGroup span={'5 / span 3'} title={'filter'}>
          <FilterControls trackId={trackId} filter={filter?.current} />
        </EffectsGroup>
        {/*<ControlGroup orientation={'horizontal'} title={'effects'}>*/}
        {/*  <ButtonControl*/}
        {/*    trackId={trackId}*/}
        {/*    node={phaser?.current}*/}
        {/*    effectName={'effect-phaser'}*/}
        {/*    label={'PSR'}*/}
        {/*    showPercentageValue*/}
        {/*  />*/}
        {/*</ControlGroup>*/}
        <EffectsGroup span={'9 / span 4'} title={'envelope'}>
          <EnvelopeControls trackId={trackId} envelope={synth?.current?.envelope} />
        </EffectsGroup>
      </TrackEffects>
    </>
  );
});

export default NoiseSequencer02;
