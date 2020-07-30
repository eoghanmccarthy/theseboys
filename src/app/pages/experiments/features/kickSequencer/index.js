import React, { Fragment, useRef, useState, memo, useEffect } from 'react';
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

import './styles.css';

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';
import stepDataInitialState from 'utils/helpers/stepDataInitialState';
import drawSteps from 'utils/helpers/drawSteps';
import isStepOn from 'utils/helpers/isStepOn';

import { Panel, Meta, PlayButton, Steps, EffectControls } from '../../ui';

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
        release: 0
      }
    }).chain(channel.current, compressor.current, gain.current, Destination)
  );

  useEffect(() => {
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
        <button
          onClick={() => {
            const { mute } = channel?.current.get();
            channel?.current.set({ mute: !mute });
          }}
        >
          mute
        </button>
      </Meta>
      <Panel>
        <div className={'exp step-seq__effects'}>
          <EffectControls
            node={channel?.current}
            param={'volume'}
            sequencerName={sequencerName}
            name={'volume'}
            label={'VOL'}
            step={1}
            min={-60}
            max={20}
            showPercentageValue
          />
          <EffectControls
            node={channel?.current}
            param={'pan'}
            sequencerName={sequencerName}
            name={'pan'}
            label={'PAN'}
            min={-1}
          />
          <EffectControls
            node={synth?.current.envelope}
            param={'attack'}
            sequencerName={sequencerName}
            name={'attack'}
            label={'ATK'}
            step={0.001}
            toFixed={3}
          />
          <EffectControls
            node={synth?.current.envelope}
            param={'decay'}
            sequencerName={sequencerName}
            name={'decay'}
            label={'DEC'}
            step={0.001}
            toFixed={3}
          />
          <EffectControls
            node={synth?.current.envelope}
            param={'sustain'}
            sequencerName={sequencerName}
            name={'sustain'}
            label={'SUS'}
            step={0.001}
            toFixed={3}
          />
          <EffectControls
            node={synth?.current.envelope}
            param={'release'}
            sequencerName={sequencerName}
            name={'release'}
            label={'REL'}
            step={0.001}
            toFixed={3}
          />
        </div>
      </Panel>
    </Fragment>
  );
});

export default KickSequencer;
