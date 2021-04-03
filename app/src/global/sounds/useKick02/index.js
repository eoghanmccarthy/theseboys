import React, { useRef } from 'react';
import { MembraneSynth, Compressor, Destination, Gain } from 'tone';

export default () => {
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
    }).chain(compressor.current, gain.current, Destination)
  );

  const trigger = (note = 'C1', duration = '8n') => {
    membrane.current.triggerAttackRelease(note, duration);
  };

  return { trigger };
};
