import React, { useRef, memo, useEffect } from 'react';
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

import random from 'utils/studioHelpers/random';
import newArray from 'utils/studioHelpers/newArray';
import stepDataInitialState from 'utils/studioHelpers/stepDataInitialState';
import { onSequenceStep } from 'features/stepSequencer/utils';

import ButtonGroup from 'componentLib/ButtonGroup';
import { Steps } from 'features/stepSequencer';
import {
  ButtonControl,
  TrackContainer,
  MuteButton,
  HitButton,
  TrackMeta,
  TrackSteps,
  TrackControls,
  ControlGroup,
  ToggleControlsButton
} from '../../ui';
import ChannelControls from '../channelControls';
import EnvelopeControls from '../envelopeControls';
import FilterControls from '../filterControls';
import Eq3Controls from '../eq3Controls';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 16;

const noteInterval = `${numCols}n`;

const noteIndices = newArray(numCols);

const NoiseSequencer02 = memo(({ trackId, channelDefaults }) => {
  if (!trackId) return null;

  const [data, setData] = useImmer(() => stepDataInitialState(numRows, numCols));

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
    onSequenceStep(time, trackId, numRows, numCols, column, (t, v) =>
      onTriggerAttackRelease(noteInterval, t, v)
    );
  };

  return (
    <TrackContainer>
      <TrackMeta>
        <ButtonGroup>
          <MuteButton node={channel?.current} trackId={trackId} />
        </ButtonGroup>
        <ButtonGroup>
          <ChannelControls trackId={trackId} channel={channel?.current} />
          <ToggleControlsButton trackId={trackId} />
        </ButtonGroup>
      </TrackMeta>
      <TrackSteps>
        <ButtonGroup>
          <HitButton trackId={trackId} onClick={() => onTriggerAttackRelease(noteInterval)} />
        </ButtonGroup>
        <Steps trackId={trackId} steps={stepsRef?.current} />
      </TrackSteps>
      <TrackControls trackId={trackId}>
        <Eq3Controls trackId={trackId} eq3={eq3?.current} />
        <FilterControls trackId={trackId} filter={filter?.current} />
        {/*<ControlGroup orientation={'horizontal'} title={'effects'}>*/}
        {/*  <ButtonControl*/}
        {/*    trackId={trackId}*/}
        {/*    node={phaser?.current}*/}
        {/*    effectName={'effect-phaser'}*/}
        {/*    label={'PSR'}*/}
        {/*    showPercentageValue*/}
        {/*  />*/}
        {/*</ControlGroup>*/}
        <EnvelopeControls trackId={trackId} envelope={synth?.current?.envelope} />
      </TrackControls>
    </TrackContainer>
  );
});

export default NoiseSequencer02;
