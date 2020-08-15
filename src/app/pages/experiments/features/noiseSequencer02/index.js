import React, { Fragment, useRef, memo, useEffect } from 'react';
import { useImmer } from 'use-immer';
import {
  PolySynth,
  Reverb,
  FeedbackDelay,
  DuoSynth,
  Destination,
  Sequence,
  Draw,
  Distortion,
  PitchShift,
  Channel,
  Compressor,
  Gain,
  MembraneSynth,
  MetalSynth,
  NoiseSynth
} from 'tone';

//https://tone-demos.glitch.me/

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';
import stepDataInitialState from 'utils/helpers/stepDataInitialState';
import drawSteps from 'utils/helpers/drawSteps';
import isStepOn from 'utils/helpers/isStepOn';

import {
  Panel,
  Meta,
  Steps,
  ControlsContainer,
  EffectControl,
  TrackContainer,
  MuteButton,
  HitButton
} from '../../ui';
import ChannelControls from '../channelControls';
import EnvelopeControls from '../envelopeControls';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const noteIndices = newArray(numCols);

const sequencerName = 'noise-synth';

const NoiseSequencer02 = memo(() => {
  const [data, setData] = useImmer(() => stepDataInitialState(numRows, numCols));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

  const channel = useRef(
    new Channel({
      pan: 0,
      volume: 10,
      mute: false,
      solo: false
    })
  );

  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.3,
      release: 0.1
    })
  );

  const distortion = useRef(new Distortion({ distortion: 1, oversample: '4x', wet: 0.6 }));

  const reverb = useRef(
    new Reverb({
      decay: 4,
      wet: 0.2,
      preDelay: 0.25
    })
  );

  const gain = useRef(new Gain(2).toDestination());

  const synth = useRef(
    new NoiseSynth({
      volume: -14,
      envelope: {
        attack: 0.01,
        decay: 0.15
      }
    }).chain(channel.current, Destination)
  );

  useEffect(() => {
    sequence.current = new Sequence(onSequenceStep, noteIndices, noteInterval).start(0);

    return () => {
      if (sequence.current) sequence.current.dispose();
    };
  }, []);

  const onTriggerAttackRelease = (duration, time, velocity) => {
    if (!synth) return;

    synth.current.triggerAttackRelease(duration, time, velocity);
  };

  const onSequenceStep = (time, column) => {
    for (let i = 0; i < stepsRef.current.length; i++) {
      const velocity = random(0.5, 1);

      if (isStepOn(sequencerName, i, column)) {
        onTriggerAttackRelease(noteInterval, time, velocity);
      }
    }

    Draw.schedule(() => {
      drawSteps(sequencerName, numCols, column);
    }, time);
  };

  return (
    <TrackContainer>
      <Meta>
        <HitButton
          sequencerName={sequencerName}
          onClick={() => onTriggerAttackRelease(noteInterval)}
        />
        <MuteButton node={channel?.current} sequencerName={sequencerName} />
      </Meta>
      <Panel>
        <Steps sequencer={sequencerName} steps={stepsRef?.current} />
      </Panel>
      <Meta>
        <ControlsContainer>
          <ChannelControls sequencerName={sequencerName} channel={channel?.current} />
        </ControlsContainer>
      </Meta>
      <Panel>
        <ControlsContainer>
          <EffectControl
            showPercentageValue
            node={distortion?.current}
            sequencerName={sequencerName}
            effectName={'distortion'}
            label={'DIS'}
          />
          <EffectControl
            showPercentageValue
            node={reverb?.current}
            sequencerName={sequencerName}
            effectName={'reverb'}
            label={'REV'}
          />
          {/*<EffectControl*/}
          {/*  node={delay?.current}*/}
          {/*  sequencerName={sequencerName}*/}
          {/*  effectName={'delay'}*/}
          {/*  label={'DLY'}*/}
          {/*  showPercentageValue*/}
          {/*/>*/}
        </ControlsContainer>
      </Panel>
      <Panel>
        <ControlsContainer>
          <EnvelopeControls sequencerName={sequencerName} envelope={synth?.current?.envelope} />
        </ControlsContainer>
      </Panel>
    </TrackContainer>
  );
});

export default NoiseSequencer02;
