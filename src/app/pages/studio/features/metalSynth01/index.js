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
  MetalSynth
} from 'tone';

//https://tone-demos.glitch.me/

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';
import stepDataInitialState from 'utils/helpers/stepDataInitialState';
import drawSteps from 'utils/helpers/drawSteps';
import isStepOn from 'utils/helpers/isStepOn';

import {
  Meta,
  Steps,
  ButtonControl,
  TrackContainer,
  TrackMeta,
  TrackSteps,
  TrackControls,
  MuteButton,
  HitButton,
  ButtonGroup,
  ControlGroup
} from '../../ui';
import ChannelControls from '../channelControls';
import EnvelopeControls from '../envelopeControls';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 16;

const noteInterval = `${numCols}n`;

const noteIndices = newArray(numCols);

const MetalSynth01 = memo(({ trackId, channelDefaults }) => {
  const [data, setData] = useImmer(() => stepDataInitialState(numRows, numCols));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

  const channel = useRef(new Channel(channelDefaults));

  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.3,
      release: 0.1
    })
  );

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
      wet: 0.6,
      preDelay: 0.25
    })
  );

  const gain = useRef(new Gain(2));

  const synth = useRef(
    new MetalSynth({
      harmonicity: 12,
      resonance: 1000,
      modulationIndex: 20,
      envelope: {
        attack: 2.0,
        decay: 0.4,
        sustain: 0.512,
        release: 0.067
      },
      volume: -15
    }).chain(
      channel.current,
      distortion.current,
      reverb.current,
      delay.current,
      compressor.current,
      gain.current,
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
          <MuteButton trackId={trackId} node={channel?.current} />
        </ButtonGroup>
        <ChannelControls trackId={trackId} channel={channel?.current} />
      </TrackMeta>
      <TrackSteps>
        <ButtonGroup>
          <HitButton trackId={trackId} onClick={() => onTriggerAttackRelease(noteInterval)} />
        </ButtonGroup>
        <Steps trackId={trackId} steps={stepsRef?.current} />
      </TrackSteps>
      <TrackControls>
        <Meta></Meta>
        <ControlGroup orientation={'horizontal'} title={'effects'}>
          <ButtonControl
            trackId={trackId}
            node={distortion?.current}
            effectName={'distortion'}
            label={'DIS'}
            showPercentageValue
          />
          <ButtonControl
            trackId={trackId}
            node={reverb?.current}
            effectName={'reverb'}
            label={'REV'}
            showPercentageValue
          />
          <ButtonControl
            trackId={trackId}
            node={delay?.current}
            effectName={'delay'}
            label={'DLY'}
            showPercentageValue
          />
        </ControlGroup>
        <EnvelopeControls trackId={trackId} envelope={synth?.current?.envelope} />
      </TrackControls>
    </TrackContainer>
  );
});

export default MetalSynth01;
