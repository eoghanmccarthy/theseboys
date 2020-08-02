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
  MembraneSynth
} from 'tone';

//https://tone-demos.glitch.me/

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';
import stepDataInitialState from 'utils/helpers/stepDataInitialState';
import drawSteps from 'utils/helpers/drawSteps';
import isStepOn from 'utils/helpers/isStepOn';

import { Panel, Meta, Steps, ControlsContainer, EffectControls } from '../../ui';
import ChannelControls from '../channelControls';
import EnvelopeControls from '../envelopeControls';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const noteIndices = newArray(numCols);

const sequencerName = 'step-seq-002';

const KickSequencer = memo(() => {
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

  const gain = useRef(new Gain(2).toDestination());

  const synth = useRef(
    new MembraneSynth({
      pitchDecay: 0.01,
      octaves: 6,
      oscillator: {
        type: 'square4'
      },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0,
        release: 1.4
      }
    }).chain(channel.current, compressor.current, gain.current, Destination)
  );

  useEffect(() => {
    console.log(synth?.current);

    sequence.current = new Sequence(onSequenceStep, noteIndices, noteInterval).start(0);

    return () => {
      if (sequence.current) sequence.current.dispose();
    };
  }, []);

  const onSequenceStep = (time, column) => {
    for (let i = 0; i < stepsRef.current.length; i++) {
      const velocity = random(0.5, 1);

      if (isStepOn(sequencerName, i, column)) {
        synth.current.triggerAttackRelease('C1', noteInterval, time, velocity);
      }
    }

    Draw.schedule(() => {
      drawSteps(sequencerName, numCols, column);
    }, time);
  };

  return (
    <Fragment>
      <Meta />
      <Panel>
        <Steps sequencer={sequencerName} steps={stepsRef?.current} />
      </Panel>
      <Meta>
        <ControlsContainer>
          <ChannelControls sequencerName={sequencerName} channel={channel?.current} />
        </ControlsContainer>
        {/*<button*/}
        {/*  onClick={() => {*/}
        {/*    const { mute } = channel?.current.get();*/}
        {/*    channel?.current.set({ mute: !mute });*/}
        {/*  }}*/}
        {/*>*/}
        {/*  mute*/}
        {/*</button>*/}
      </Meta>
      <Panel>
        <ControlsContainer>
          <EnvelopeControls sequencerName={sequencerName} envelope={synth?.current?.envelope} />
        </ControlsContainer>
      </Panel>
    </Fragment>
  );
});

export default KickSequencer;
