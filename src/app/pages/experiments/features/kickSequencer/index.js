import React, { useRef, memo, useEffect } from 'react';
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
  MembraneSynth,
  EQ3
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
  MuteButton,
  HitButton,
  Steps,
  ControlsContainer,
  EffectControl,
  ButtonGroup,
  TrackContainer,
  TrackMeta,
  TrackSteps,
  TrackControls
} from '../../ui';
import ChannelControls from '../channelControls';
import EnvelopeControls from '../envelopeControls';
import Eq3Controls from '../eq3Controls';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 16;

const noteInterval = `${numCols}n`;

const noteIndices = newArray(numCols);

const KickSequencer = memo(({ trackId }) => {
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

  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.3,
      release: 0.1
    })
  );

  const gain = useRef(new Gain(2).toDestination());

  const eq3 = useRef(new EQ3({ low: 0, mid: 0, high: 0 }));

  const delay = useRef(
    new FeedbackDelay({
      delayTime: `${Math.floor(numCols / 2)}n`,
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
        decay: 0.2,
        sustain: 0,
        release: 1.4
      }
    }).chain(
      channel.current,
      compressor.current,
      gain.current,
      delay.current,
      distortion.current,
      reverb.current,
      eq3.current,
      Destination
    )
  );

  useEffect(() => {
    sequence.current = new Sequence(onSequenceStep, noteIndices, noteInterval).start(0);

    return () => {
      if (sequence.current) sequence.current.dispose();
    };
  }, []);

  const onTriggerAttackRelease = (duration, time, velocity) => {
    if (!synth) return;

    synth.current.triggerAttackRelease('C1', duration, time, velocity);
  };

  const onSequenceStep = (time, column) => {
    for (let i = 0; i < stepsRef.current.length; i++) {
      const velocity = random(0.5, 1);

      if (isStepOn(trackId, i, column)) {
        onTriggerAttackRelease(noteInterval, time, velocity);
      }
    }

    Draw.schedule(() => {
      drawSteps(trackId, numCols, column);
    }, time);
  };

  return (
    <TrackContainer>
      <TrackMeta>
        <ButtonGroup>
          <HitButton trackId={trackId} onClick={() => onTriggerAttackRelease(noteInterval)} />
          <MuteButton node={channel?.current} trackId={trackId} />
        </ButtonGroup>
        <ChannelControls trackId={trackId} channel={channel?.current} />
      </TrackMeta>
      <TrackSteps>
        <Panel>
          <Steps trackId={trackId} steps={stepsRef?.current} />
        </Panel>
      </TrackSteps>
      <TrackControls>
        <Meta></Meta>
        <Panel>
          <ControlsContainer>
            <EffectControl
              node={distortion?.current}
              trackId={trackId}
              effectName={'distortion'}
              label={'DIS'}
              showPercentageValue
            />
            <EffectControl
              node={reverb?.current}
              trackId={trackId}
              effectName={'reverb'}
              label={'REV'}
              showPercentageValue
            />
            <EffectControl
              node={delay?.current}
              trackId={trackId}
              effectName={'delay'}
              label={'DLY'}
              showPercentageValue
            />
          </ControlsContainer>
        </Panel>
        <Panel>
          <ControlsContainer>
            <Eq3Controls trackId={trackId} eq3={eq3?.current} />
            <EnvelopeControls trackId={trackId} envelope={synth?.current?.envelope} />
          </ControlsContainer>
        </Panel>
      </TrackControls>
    </TrackContainer>
  );
});

export default KickSequencer;
