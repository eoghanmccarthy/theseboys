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

import random from 'utils/studioHelpers/random';
import newArray from 'utils/studioHelpers/newArray';
import stepDataInitialState from 'utils/studioHelpers/stepDataInitialState';
import drawSteps from 'utils/studioHelpers/drawSteps';
import isStepOn from 'utils/studioHelpers/isStepOn';

import {
  MuteButton,
  HitButton,
  Steps,
  ControlGroup,
  ButtonControl,
  ButtonGroup,
  TrackContainer,
  TrackMeta,
  TrackSteps,
  TrackControls
} from '../../ui';
import ChannelControls from '../channelControls';
import EnvelopeControls from '../envelopeControls';
import CompressorControls from '../compressorControls';
import Eq3Controls from '../eq3Controls';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 16;

const noteInterval = `${numCols}n`;

const noteIndices = newArray(numCols);

const MembraneSynth01 = memo(({ trackId, channelDefaults }) => {
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

  const gain = useRef(new Gain(2));

  const eq3 = useRef(new EQ3({ low: -21, mid: -56, high: -54 }));

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
        attack: 0.09,
        decay: 0.45,
        sustain: 0.1,
        release: 0.3
      }
    }).chain(channel.current, eq3.current, compressor.current, gain.current, Destination)
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
      const velocity = column === 0 ? 1 : 0.75;

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
          <MuteButton node={channel?.current} trackId={trackId} />
        </ButtonGroup>
        <ChannelControls trackId={trackId} channel={channel?.current} />
        <button
          onClick={() => {
            const elem = document.querySelector(`.track__controls.${trackId}`);
            const display = elem.style.display;

            elem.style.display = display !== 'none' ? 'none' : 'flex';
          }}
        >
          hide
        </button>
      </TrackMeta>
      <TrackSteps>
        <ButtonGroup>
          <HitButton trackId={trackId} onClick={() => onTriggerAttackRelease(noteInterval)} />
        </ButtonGroup>
        <Steps trackId={trackId} steps={stepsRef?.current} />
      </TrackSteps>
      <TrackControls trackId={trackId}>
        <Eq3Controls trackId={trackId} eq3={eq3?.current} />
        <CompressorControls trackId={trackId} compressor={compressor.current} />
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

export default MembraneSynth01;
