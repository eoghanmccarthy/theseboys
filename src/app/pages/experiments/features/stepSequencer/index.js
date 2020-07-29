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
  Channel
} from 'tone';

//https://tone-demos.glitch.me/

import './styles.css';

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';
import stepDataInitialState from 'utils/helpers/stepDataInitialState';

import { Panel, Meta, PlayButton, Step, EffectControls } from '../../ui';

const notes = ['F#4', 'E4', 'C#4', 'A4'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const noteIndices = newArray(numCols);

const sequencerName = 'step-seq-001';

const StepSequencer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);

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
      const isOn = document
        .querySelector(`.${sequencerName}__step.track-${i}-step-${column}`)
        .classList.contains('on');

      if (isOn) {
        const note = notes[i];
        notesToPlay.push(note);
      }
    }

    const velocity = random(0.5, 1);

    synth.current.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);

    Draw.schedule(() => {
      const elements = document.getElementsByClassName(`${sequencerName}__step`);

      for (let i = 0; i < elements.length; i++) {
        const currentStep = (i - column) % numCols === 0;
        if (currentStep) {
          elements[i].classList.add('current');
          if (elements[i].classList.contains('on')) {
            elements[i].classList.add('playing');
          }
        } else {
          elements[i].classList.remove('current', 'playing');
        }
      }
    }, time);
  };

  const start = () => {
    if (!synth) {
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      Transport.stop();
    } else {
      setIsPlaying(true);
      Transport.state === 'stopped' && Transport.start();
    }
  };

  return (
    <Fragment>
      <Meta>
        <PlayButton isPlaying={isPlaying} onClick={() => start()} />
      </Meta>
      <Panel>
        <div className={`exp step-seq__steps`}>
          {stepsRef.current.map((rowData, trackIndex) => (
            <div key={trackIndex} className={`row`}>
              {rowData.map((stepValue, stepIndex) => (
                <Step
                  key={stepIndex}
                  sequencerName={sequencerName}
                  trackIndex={trackIndex}
                  stepIndex={stepIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </Panel>
      <Meta />
      <Panel>
        <div className={'exp step-seq__effects'}>
          <button
            onClick={() => {
              const { mute } = channel?.current.get();

              channel?.current.set({ mute: !mute });
            }}
          >
            mute
          </button>
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
            node={distortion?.current}
            sequencerName={sequencerName}
            name={'distortion'}
            label={'DIS'}
            showPercentageValue
          />
          <EffectControls
            node={reverb?.current}
            sequencerName={sequencerName}
            name={'reverb'}
            label={'REV'}
            showPercentageValue
          />
          <EffectControls
            node={delay?.current}
            sequencerName={sequencerName}
            name={'delay'}
            label={'DLY'}
            showPercentageValue
          />
        </div>
      </Panel>
    </Fragment>
  );
});

export default StepSequencer;
