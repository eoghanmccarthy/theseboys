import React, { Fragment, useRef, useState, memo } from 'react';
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
  Distortion
} from 'tone';

//https://tone-demos.glitch.me/

import './styles.css';

import random from 'utils/helpers/random';
import newArray from 'utils/helpers/newArray';

import { PlayButton } from '../../ui';

const notes = ['F#4', 'E4', 'C#4', 'A4'];

const numRows = notes.length;

const numCols = 4;

const noteInterval = `${numCols}n`;

const StepSequencer = memo(() => {
  const [playing, setPlaying] = useState(false);

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

  const distortion = useRef(new Distortion({ wet: 0.6 }));

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
    let columnData = [];

    for (let i = 0; i < stepsRef.current.length; i++) {
      const isOn = stepsRef.current[i][column] === 1;
      if (isOn) {
        const note = notes[i];
        notesToPlay.push(note);
        columnData.push(1);
      } else {
        columnData.push(0);
      }
    }

    const velocity = random(0.5, 1);

    synth.current.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);

    Draw.schedule(() => {
      const elems = document.getElementsByClassName(`step-sequencer__col`);
      for (let i = 0; i < elems.length; i++) {
        elems[i].setAttribute(
          'style',
          'opacity: 0.5; transform: scale(1); background-color: white;'
        );
      }

      for (let i = 0; i < stepsRef.current.length; i++) {
        const isOn = columnData[i] === 1;
        const elem = document.querySelector(`.step-sequencer__col-${column}-${i}`);

        if (isOn) {
          elem.setAttribute(
            'style',
            `opacity: ${random(0.5, 0.88)}; transform: scale(${velocity *
              5}); background-color: hsl(${random(60, 70)}, ${random(82, 96)}%, ${random(
              56,
              100
            )}%);`
          );
        }
      }
    }, time);
  };

  const start = () => {
    if (!synth) {
      return;
    }

    if (playing) {
      setPlaying(false);
      sequence.current.stop();
      Transport.stop();
    } else {
      const noteIndices = newArray(numCols);
      sequence.current = new Sequence(onSequenceStep, noteIndices, noteInterval);

      setPlaying(true);
      sequence.current.start();
      Transport.start();
    }
  };

  return (
    <Fragment>
      {/*<PlayButton onClick={() => start()} />*/}
      <div onClick={() => start()}>jj</div>
      <div className={'exp step-sequencer'}>
        {data.map((rowData, rowIndex) => (
          <div key={rowIndex} className={`row`}>
            {rowData.map((stepValue, stepIndex) => (
              <span
                key={stepIndex}
                className={`step-sequencer__col step-sequencer__col-${stepIndex}-${rowIndex}`}
                onClick={() => {
                  setData(draft => {
                    draft[rowIndex][stepIndex] = stepValue === 0 ? 1 : 0;
                  });
                }}
              >
                o
              </span>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
});

export default StepSequencer;
