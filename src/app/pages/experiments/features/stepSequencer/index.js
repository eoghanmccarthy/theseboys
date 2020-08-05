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
  Channel
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
  MuteButton
} from '../../ui';
import ChannelControls from '../channelControls';
import EnvelopeControls from '../envelopeControls';

const notes = ['F#4', 'E4', 'C#4', 'A4'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const noteIndices = newArray(numCols);

const sequencerName = 'step-seq-001';

const StepSequencer = memo(() => {
  const [data, setData] = useImmer(() => stepDataInitialState(numRows, numCols));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

  const channel = useRef(
    new Channel({
      pan: 0,
      volume: 12,
      mute: false,
      solo: false
    })
  );

  const pitchShift = useRef(
    new PitchShift({
      pitch: 0,
      windowSize: 0.1,
      delayTime: 0,
      feedback: 0
    })
  );

  const delay = useRef(
    new FeedbackDelay({
      delayTime: `${Math.floor(numCols / 2)}n`,
      feedback: 1 / 3,
      wet: 0.2
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

  const synth = useRef(
    new PolySynth(DuoSynth, {
      volume: -10,
      polyphony: numRows,
      voice0: {
        oscillator: {
          type: 'triangle4'
        },
        volume: -30,
        envelope: {
          attack: 0.005,
          release: 0.05,
          sustain: 1
        }
      },
      voice1: {
        volume: -10,
        envelope: {
          attack: 0.005,
          release: 0.05,
          sustain: 1
        }
      }
    }).chain(
      channel.current,
      pitchShift.current,
      delay.current,
      distortion.current,
      reverb.current,
      Destination
    )
  );

  useEffect(() => {
    sequence.current = new Sequence(onSequenceStep, noteIndices, noteInterval).start(0);

    return () => {
      if (sequence.current) sequence.current.dispose();
    };
  }, []);

  const onSequenceStep = (time, column) => {
    let notesToPlay = [];

    for (let i = 0; i < stepsRef.current.length; i++) {
      if (isStepOn(sequencerName, i, column)) {
        const note = notes[i];
        notesToPlay.push(note);
      }
    }

    const velocity = random(0.5, 1);

    synth.current.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);

    Draw.schedule(() => {
      drawSteps(sequencerName, numCols, column);
    }, time);
  };

  return (
    <TrackContainer>
      <Meta>
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
            node={distortion?.current}
            sequencerName={sequencerName}
            effectName={'distortion'}
            label={'DIS'}
            showPercentageValue
          />
          <EffectControl
            node={reverb?.current}
            sequencerName={sequencerName}
            effectName={'reverb'}
            label={'REV'}
            showPercentageValue
          />
          <EffectControl
            node={delay?.current}
            sequencerName={sequencerName}
            effectName={'delay'}
            label={'DLY'}
            showPercentageValue
          />
        </ControlsContainer>
      </Panel>
      <Panel />
    </TrackContainer>
  );
});

export default StepSequencer;
