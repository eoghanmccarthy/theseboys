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
  Distortion
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

const StepSequencer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [data, setData] = useImmer(() => stepDataInitialState(numRows, numCols));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();

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
    }).chain(delay.current, distortion.current, reverb.current, Destination)
  );

  const onSequenceStep = (time, column) => {
    let notesToPlay = [];

    for (let i = 0; i < stepsRef.current.length; i++) {
      const isOn = document
        .querySelector(`.step-sequencer__step.track-${i}-step-${column}`)
        .classList.contains('on');

      if (isOn) {
        const note = notes[i];
        notesToPlay.push(note);
      }
    }

    const velocity = random(0.5, 1);

    synth.current.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);

    Draw.schedule(() => {
      const elements = document.getElementsByClassName(`step-sequencer__step`);

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
      sequence.current.stop();
      //Transport.stop();
    } else {
      const noteIndices = newArray(numCols);
      sequence.current = new Sequence(onSequenceStep, noteIndices, noteInterval);

      setIsPlaying(true);
      sequence.current.start();
      Transport.state === 'stopped' && Transport.start();
    }
  };

  return (
    <Fragment>
      <Meta>
        <PlayButton isPlaying={isPlaying} onClick={() => start()} />
      </Meta>
      <Panel>
        <div className={'exp step-sequencer'}>
          {stepsRef.current.map((rowData, trackIndex) => (
            <div key={trackIndex} className={`row`}>
              {rowData.map((stepValue, stepIndex) => (
                <div
                  key={stepIndex}
                  className={classNames(
                    `step-sequencer__step`,
                    `track-${trackIndex}-step-${stepIndex}`
                  )}
                  onClick={() => {
                    const elem = document.querySelector(
                      `.step-sequencer__step.track-${trackIndex}-step-${stepIndex}`
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
        <EffectButton className={'distortion'} node={distortion?.current}>
          distortion up
        </EffectButton>
        <EffectButton className={'distortion'} node={distortion?.current} dec limit={0}>
          distortion down
        </EffectButton>
        <EffectButton className={'reverb'} node={reverb?.current}>
          reverb up
        </EffectButton>
        <EffectButton className={'reverb'} node={reverb?.current} dec limit={0}>
          reverb down
        </EffectButton>
        <EffectButton className={'delay'} node={delay?.current}>
          delay up
        </EffectButton>
        <EffectButton className={'delay'} node={delay?.current} dec limit={0}>
          delay down
        </EffectButton>
      </Panel>
    </Fragment>
  );
});

export default StepSequencer;

const EffectButton = memo(({ children, className, node, dec, step = 0.1, limit = 1 }) => {
  if (!node) {
    return null;
  }

  return (
    <button
      className={cx('step-sequencer__effect', className, {
        inc: !dec,
        dec: dec
      })}
      onClick={() => {
        const { wet } = node.get();
        const val = !dec ? Math.min(wet + step, limit) : Math.max(wet - step, limit);

        if (val === 0) {
          document.querySelector(`.step-sequencer__effect.${className}.dec`).classList.add('limit');
        } else if (val === 1) {
          document.querySelector(`.step-sequencer__effect.${className}.inc`).classList.add('limit');
        } else {
          document
            .querySelectorAll(`.step-sequencer__effect.${className}`)
            .forEach(el => el.classList.remove('limit'));
        }

        node.set({ wet: val });
      }}
    >
      {children}
    </button>
  );
});
