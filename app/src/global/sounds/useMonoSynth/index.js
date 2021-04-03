import React, { useRef } from 'react';
import {
  MonoSynth,
  MembraneSynth,
  Freeverb,
  FeedbackDelay,
  Gate,
  MidSideCompressor,
  Gain,
  Destination
} from 'tone';

//http://www.katyarozanova.com/art/2017/11/7/pattern-and-sound-series
//https://editor.p5js.org/katya/sketches/S1dRFwsWG

export default () => {
  const gate = useRef(new Gate(-50));

  const compressor = useRef(new MidSideCompressor());

  const synth = useRef(
    new MonoSynth({
      portamento: 0.0,
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.005,
        decay: 0.2,
        sustain: 0.4,
        release: 1.4
      },
      filterEnvelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.05,
        release: 0.8,
        baseFrequency: 200,
        octaves: 4
      }
    }).chain(gate.current, compressor.current, Destination)
  );

  const trigger = time => {
    synth.current.triggerAttackRelease(4, '8n');
  };

  return { trigger };
};
