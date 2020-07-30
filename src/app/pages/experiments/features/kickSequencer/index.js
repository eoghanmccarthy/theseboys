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
  MembraneSynth
} from 'tone';

//https://tone-demos.glitch.me/

import './styles.css';

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';
import stepDataInitialState from 'utils/helpers/stepDataInitialState';

import { Panel, Meta, PlayButton, Step, EffectControls } from '../../ui';

const notes = ['C1'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const noteIndices = newArray(numCols);

const sequencerName = 'step-seq-002';

const KickSequencer = memo(() => {
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

  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.3,
      release: 0.1
    })
  );

  const gain = useRef(new Gain(2).toDestination());

  const membrane = useRef(
    new MembraneSynth({
      pitchDecay: 0.01,
      octaves: 6,
      oscillator: {
        type: 'square4'
      },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0
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
      const isOn = document
        .querySelector(`.${sequencerName}__step.track-${i}-step-${column}`)
        .classList.contains('on');

      if (isOn) {
        membrane.current.triggerAttackRelease('C1', noteInterval, time);
      }
    }

    const velocity = random(0.5, 1);

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

  return (
    <Fragment>
      <Meta>
        <PlayButton isPlaying={isPlaying} onClick={() => null} />
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
          {/*<EffectControls*/}
          {/*  node={distortion?.current}*/}
          {/*  sequencerName={sequencerName}*/}
          {/*  name={'distortion'}*/}
          {/*  label={'DIS'}*/}
          {/*  showPercentageValue*/}
          {/*/>*/}
          {/*<EffectControls*/}
          {/*  node={reverb?.current}*/}
          {/*  sequencerName={sequencerName}*/}
          {/*  name={'reverb'}*/}
          {/*  label={'REV'}*/}
          {/*  showPercentageValue*/}
          {/*/>*/}
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

export default KickSequencer;
