import React, { Fragment, useRef, useState, memo } from 'react';
import { useImmer } from 'use-immer';
import cx from 'classnames';
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

import { Panel, Meta, PlayButton } from '../../ui';
import classNames from 'classnames';

const notes = ['F#4', 'E4', 'C#4', 'A4'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const noteIndices = newArray(numCols);

const StepSequencer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [data, setData] = useImmer(() => stepDataInitialState(numRows, numCols));

  const stepsRef = useRef(data);
  stepsRef.current = data;

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
      pitch: -12,
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

  const distortion = useRef(new Distortion({ wet: 0.9 }));

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

  const onSequenceStep = (time, column) => {
    let notesToPlay = [];

    for (let i = 0; i < stepsRef.current.length; i++) {
      const isOn = document
        .querySelector(`.synth-step-sequencer__step.track-${i}-step-${column}`)
        .classList.contains('on');

      if (isOn) {
        const note = notes[i];
        notesToPlay.push(note);
      }
    }

    const velocity = random(0.5, 1);

    synth.current.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);

    Draw.schedule(() => {
      const elements = document.getElementsByClassName(`synth-step-sequencer__step`);

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

  const sequence = useRef(new Sequence(onSequenceStep, noteIndices, noteInterval).start(0));

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
        <div className={'exp synth-step-sequencer'}>
          {stepsRef.current.map((rowData, trackIndex) => (
            <div key={trackIndex} className={`row`}>
              {rowData.map((stepValue, stepIndex) => (
                <div
                  key={stepIndex}
                  className={classNames(
                    `synth-step-sequencer__step`,
                    `track-${trackIndex}-step-${stepIndex}`
                  )}
                  onClick={() => {
                    const elem = document.querySelector(
                      `.synth-step-sequencer__step.track-${trackIndex}-step-${stepIndex}`
                    );
                    if (!elem.classList.contains('on')) {
                      elem.classList.add('on');
                    } else {
                      elem.classList.remove('on');
                    }
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </Panel>
      <Meta />
      <Panel>
        <div className={'exp synth-step-sequencer__effects'}>
          <EffectControl
            node={channel?.current}
            param={'volume'}
            name={'volume'}
            label={'VOL'}
            step={1}
            min={-60}
            max={20}
          />
          <EffectControl
            node={channel?.current}
            param={'pan'}
            name={'pan'}
            label={'PAN'}
            min={-1}
          />
          <EffectControl node={distortion?.current} name={'distortion'} label={'DIS'} />
          <EffectControl node={reverb?.current} name={'reverb'} label={'REV'} />
          <EffectControl node={delay?.current} name={'delay'} label={'DLY'} />
        </div>
      </Panel>
    </Fragment>
  );
});

export default StepSequencer;

const EffectControl = memo(({ node, param = 'wet', name, label, step = 0.1, min = 0, max = 1 }) => {
  if (!node) {
    return null;
  }

  return (
    <div className={'synth-step-sequencer__effect'}>
      <RangeButton className={name} node={node} param={param} step={step} min={min} max={max}>
        +
      </RangeButton>
      <span className={'effect-label'}>{label}</span>
      <RangeButton className={name} node={node} param={param} step={step} dec min={min} max={max}>
        <span />
      </RangeButton>
    </div>
  );
});

const RangeButton = memo(
  ({ children, className, node, param = 'wet', dec, step = 0.1, min = 0, max = 1 }) => {
    if (!node) {
      return null;
    }

    return (
      <button
        className={cx('effect-control', className, {
          inc: !dec,
          dec: dec
        })}
        onClick={() => {
          const params = node.get();
          const previous = params[param];
          const val = !dec ? Math.min(previous + step, max) : Math.max(previous - step, min);

          if (val === min) {
            document.querySelector(`.effect-control.${className}.dec`).classList.add('limit');
          } else if (val === max) {
            document.querySelector(`.effect-control.${className}.inc`).classList.add('limit');
          } else {
            document
              .querySelectorAll(`.effect-control.${className}`)
              .forEach(el => el.classList.remove('limit'));
          }

          node.set({ [param]: val });
        }}
      >
        {children}
      </button>
    );
  }
);
