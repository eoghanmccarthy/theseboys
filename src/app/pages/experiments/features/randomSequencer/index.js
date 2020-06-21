import React, { Fragment, useRef, useState, useEffect, memo } from 'react';
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

import { PlayButton } from '../../ui';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['F#4', 'E4', 'C#4', 'A4'];
const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];
//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];

const numRows = notes.length;

const numCols = 16;
const noteInterval = `${numCols}n`;

const newArray = n => {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }
  return array;
};

const random = (min, max) => {
  let rand = Math.random();

  if (typeof min === 'undefined') {
    return rand;
  } else if (typeof max === 'undefined') {
    if (min instanceof Array) {
      return min[Math.floor(rand * min.length)];
    } else {
      return rand * min;
    }
  } else {
    if (min > max) {
      const tmp = min;
      min = max;
      max = tmp;
    }

    return rand * (max - min) + min;
  }
};

const data = [];

for (let y = 0; y < numRows; y++) {
  const row = [];
  for (let x = 0; x < numCols; x++) {
    row.push(0);
  }
  data.push(row);
}

const RandomSequencer = memo(() => {
  const [playing, setPlaying] = useState(false);

  let sequence = useRef();
  let synth = useRef();

  let delay = useRef(
    new FeedbackDelay({
      delayTime: `${Math.floor(numCols / 2)}n`,
      feedback: 1 / 3,
      wet: 0.2
    })
  );

  let distortion = useRef(new Distortion({ wet: 0.6 }));

  const reverb = useRef(
    new Reverb({
      decay: 4,
      wet: 0.2,
      preDelay: 0.25
    })
  );

  useEffect(() => {
    synth.current = new PolySynth(DuoSynth, {
      volume: -10,
      polyphony: numRows
    });
    synth.current.set({
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
    });

    synth.current.chain(delay.current, distortion.current, reverb.current, Destination);
  }, []);

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
      const elems = document.getElementsByClassName(`col`);
      for (let i = 0; i < elems.length; i++) {
        elems[i].setAttribute(
          'style',
          'opacity: 0.5; transform: scale(1); background-color: transparent;'
        );
      }

      const container = document.querySelector(`.random-sequencer`);
      container.style.transform = `scale(${random(1, 3.6)})`;

      for (let i = 0; i < numRows; i++) {
        const isOn = columnData[i] === 1;
        const elem = document.querySelector(`.col-${column}-${i}`);

        if (isOn) {
          elem.setAttribute(
            'style',
            `opacity: ${random(0.5, 0.88)}; transform: scale(${random(
              1,
              4.4
            )}); background-color: hsl(${random(60, 70)}, ${random(80, 100)}%, ${random(
              50,
              100
            )}%);`
          );
        } else {
          //elem.classList.remove('on');
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
      <div className={'random-sequencer'} onClick={() => start()}>
        {data.map((rowData, rowIndex) => (
          <div key={rowIndex} className={`row row-${rowIndex}`}>
            {rowData.map((colValue, colIndex) => (
              <span key={colIndex} className={`col col-${colIndex}-${rowIndex}`} />
            ))}
          </div>
        ))}
        {/*<PlayButton >sequencer</PlayButton>*/}
      </div>
    </Fragment>
  );
});

export default RandomSequencer;
