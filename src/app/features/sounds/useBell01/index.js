import React, { useRef } from 'react';
import { MetalSynth, Compressor, Destination, Gain } from 'tone';

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

  const bell = useRef(
    new MetalSynth({
      harmonicity: 12,
      resonance: 1000,
      modulationIndex: 20,
      envelope: {
        decay: 0.4
      },
      volume: -15
    }).chain(compressor.current, gain.current, Destination)
  );

  const trigger = (note = 'C1', duration = '8n') => {
    bell.current.triggerAttackRelease(note, duration);
  };

  return { trigger };
};
