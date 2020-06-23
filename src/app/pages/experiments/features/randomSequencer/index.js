import React, { Fragment, useRef, useState, memo, useEffect } from 'react';
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

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['F#4', 'E4', 'C#4', 'A4'];
const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];

const numRows = notes.length;

const numCols = 16;
const noteInterval = `${numCols}n`;

const data = [];

for (let y = 0; y < numRows; y++) {
  const row = [];
  for (let x = 0; x < numCols; x++) {
    row.push(0);
  }
  data.push(row);
}

function randomZero_One() {
  return Math.round(Math.random());
}

const RandomSequencer = memo(() => {
  const [playing, setPlaying] = useState(false);

  // const dataRef = useRef({
  //   array: initialData,
  //   get() {
  //     return this.array;
  //   },
  //   set(data) {
  //     this.array = data;
  //   }
  // });

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

    for (let i = 0; i < numRows; i++) {
      const isOn = random(0.5, 1.12) > 1;
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
      const elems = document.getElementsByClassName(`random-sequencer__col`);
      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove('on');
        elems[i].setAttribute(
          'style',
          'opacity: 0.5; transform: scale(1); background-color: transparent;'
        );
      }

      for (let i = 0; i < numRows; i++) {
        const isOn = columnData[i] === 1;
        const elem = document.querySelector(`.random-sequencer__col-${column}-${i}`);

        if (isOn) {
          elem.classList.add('on');
          elem.setAttribute(
            'style',
            `opacity: ${random(0.5, 0.88)}; transform: scale(${velocity *
              10}); background-color: hsl(${random(60, 70)}, ${random(82, 96)}%, ${random(
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
      <PlayButton onClick={() => start()} />
      <div className={'exp random-sequencer'}>
        {data.map((rowData, rowIndex) => (
          <div key={rowIndex} className={`row`}>
            {rowData.map((stepValue, stepIndex) => (
              <span
                key={stepIndex}
                className={`random-sequencer__col random-sequencer__col-${stepIndex}-${rowIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
});

export default RandomSequencer;
