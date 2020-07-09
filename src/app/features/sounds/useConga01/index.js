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

  const gain = useRef(new Gain(2));

  const conga = useRef(
    new MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: {
        attack: 0.0006,
        decay: 0.5,
        sustain: 0
      }
    }).chain(compressor.current, gain.current, Destination)
  );

  const trigger = (note = 'C1', duration = '8n') => {
    conga.current.triggerAttackRelease(note, duration);
  };

  return { trigger, label: 'conga 01' };
};
