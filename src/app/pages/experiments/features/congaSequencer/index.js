import React, { Fragment, useRef, useState, memo, useEffect } from 'react';
import { useImmer } from 'use-immer';
import {
  PolySynth,
  Reverb,
  FeedbackDelay,
  DuoSynth,
  Destination,
  Transport,
  Sequence,
  Draw,
  Distortion,
  PitchShift,
  Channel,
  Compressor,
  Gain,
  MembraneSynth,
  MetalSynth
} from 'tone';

//https://tone-demos.glitch.me/

import './styles.css';

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';
import stepDataInitialState from 'utils/helpers/stepDataInitialState';
import drawSteps from 'utils/helpers/drawSteps';
import isStepOn from 'utils/helpers/isStepOn';

import { Panel, Meta, Steps, EffectControls } from '../../ui';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const noteIndices = newArray(numCols);

const sequencerName = 'step-seq-003';

const CongaSequencer = memo(() => {
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

  const bell = useRef(
    new MetalSynth({
      harmonicity: 12,
      resonance: 1000,
      modulationIndex: 20,
      envelope: {
        decay: 0.4
      },
      volume: -15
    }).chain(
      channel.current,
      compressor.current,
      gain.current,
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
    for (let i = 0; i < stepsRef.current.length; i++) {
      const velocity = random(0.5, 1);

      if (isStepOn(sequencerName, i, column)) {
        bell.current.triggerAttackRelease('C1', noteInterval, time, velocity);
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
            sequencerName={sequencerName}
            param={'volume'}
            name={'volume'}
            label={'VOL'}
            step={1}
            min={-60}
            max={20}
            showPercentageValue
          />
          <EffectControls
            node={channel?.current}
            sequencerName={sequencerName}
            param={'pan'}
            name={'pan'}
            label={'PAN'}
            min={-1}
          />
          <EffectControls
            showPercentageValue
            node={distortion?.current}
            sequencerName={sequencerName}
            name={'distortion'}
            label={'DIS'}
          />
          <EffectControls
            showPercentageValue
            node={reverb?.current}
            sequencerName={sequencerName}
            name={'reverb'}
            label={'REV'}
          />
          {/*<EffectControls*/}
          {/*  node={delay?.current}*/}
          {/*  sequencerName={sequencerName}*/}
          {/*  name={'delay'}*/}
          {/*  label={'DLY'}*/}
          {/*  showPercentageValue*/}
          {/*/>*/}
        </div>
      </Panel>
    </Fragment>
  );
});

export default CongaSequencer;
