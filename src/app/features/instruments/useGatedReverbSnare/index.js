import React, { useRef } from 'react';
import {
  NoiseSynth,
  MembraneSynth,
  Freeverb,
  FeedbackDelay,
  Gate,
  MidSideCompressor,
  Gain
} from 'tone';

//https://codepen.io/michaelphipps/pen/QBMENY

const useGatedReverbSnare = () => {
  const feedbackDelay = useRef(
    new FeedbackDelay({
      delayTime: '32n',
      feedback: 0.25
    })
  );

  const reverb = useRef(
    new Freeverb({
      roomSize: 0.7,
      dampening: 8000
    })
  );

  const gate = useRef(new Gate(-50));

  const compressor = useRef(new MidSideCompressor());

  const gain = useRef(new Gain().toDestination());

  const tom = useRef(
    new MembraneSynth().chain(reverb.current, gate.current, compressor.current, gain.current)
  );

  const snare = useRef(
    new NoiseSynth({
      noise: {
        type: 'brown'
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.02
      }
    }).chain(reverb.current, gate.current, compressor.current, gain.current)
  );

  const trigger = time => {
    tom.current.triggerAttackRelease('C1', '8n');
    //snare.current.triggerAttackRelease('8n');
  };

  return { trigger };
};

export default useGatedReverbSnare;
