import React, { Fragment, useRef, useState, memo } from 'react';
import { useImmer } from 'use-immer';
import classNames from 'classnames';
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

import { Panel, Meta, PlayButton } from '../../ui';

const notes = ['F#4', 'E4', 'C#4', 'A4'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];

const numRows = notes.length;

const numCols = 8;

const noteInterval = `${numCols * 2}n`;

const StepSequencer = memo(() => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [data, setData] = useImmer(() => {
    const arr = [];
    for (let y = 0; y < numRows; y++) {
      const row = [];
      for (let x = 0; x < numCols; x++) {
        row.push(0);
      }
      arr.push(row);
    }
    return arr;
  });

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

    let stepsArray = [];

    for (let i = 0; i < stepsRef.current.length; i++) {
      stepsArray = [...stepsArray, ...stepsRef.current[i]];

      const isOn = stepsRef.current[i][column] === 1;

      if (isOn) {
        const note = notes[i];
        notesToPlay.push(note);
      }
    }

    const velocity = random(0.5, 1);

    synth.current.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);

    Draw.schedule(() => {
      const allElements = document.getElementsByClassName(`step-sequencer__step`);

      for (let i = 0; i < allElements.length; i++) {
        if ((i - column) % numCols === 0) {
          allElements[i].classList.add('current');
          if (stepsArray[i] === 1) {
            allElements[i].classList.add('playing');
          }
        } else {
          allElements[i].classList.remove('current', 'playing');
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
      Transport.stop();
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
          {data.map((rowData, rowIndex) => (
            <div key={rowIndex} className={`row`}>
              {rowData.map((stepValue, stepIndex) => (
                <span
                  key={stepIndex}
                  className={classNames(`step-sequencer__step`, {
                    on: stepValue === 1
                  })}
                  onClick={() => {
                    setData(draft => {
                      draft[rowIndex][stepIndex] = stepValue === 0 ? 1 : 0;
                    });
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </Panel>
    </Fragment>
  );
});

export default StepSequencer;
