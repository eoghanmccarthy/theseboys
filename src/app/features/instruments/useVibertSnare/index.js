import React, { useRef } from 'react';
import { Filter, NoiseSynth, Synth, PolySynth } from 'tone';

//https://gist.github.com/vibertthio/9c815b7edeee2aab3aec35de7dfa57bb

const useVibertSnare = () => {
  const lowPass = useRef(
    new Filter({
      frequency: 11000
    }).toDestination()
  );

  const noise = useRef(
    new NoiseSynth({
      volume: -12,
      noise: {
        type: 'pink',
        playbackRate: 3
      },
      envelope: {
        attack: 0.001,
        decay: 0.13,
        sustain: 0,
        release: 0.03
      }
    }).connect(lowPass.current)
  );

  const poly = useRef(
    new PolySynth(Synth, {
      polyphony: 6,
      volume: -10,
      oscillator: {
        partials: [0, 2, 3, 4]
      },
      envelope: {
        attack: 0.001,
        decay: 0.17,
        sustain: 0,
        release: 0.05
      }
    }).toDestination()
  );

  const trigger = time => {
    noise.current.triggerAttack(time);
    poly.current.triggerAttackRelease(['Eb3', 'G4', 'C5'], '16n', time);
  };

  return { trigger };
};

export default useVibertSnare;
