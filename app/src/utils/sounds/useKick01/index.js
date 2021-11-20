import React, { useRef } from 'react';
import { MembraneSynth } from 'tone';

export default () => {
  const membrane = useRef(
    new MembraneSynth({
      envelope: {
        attack: 0.001,
        decay: 0.14,
        sustain: 0.04,
        release: 0.14
      }
    }).toDestination()
  );

  const trigger = (note = 'C2', duration = '8n') => {
    membrane.current.triggerAttackRelease(note, duration);
  };

  return { trigger };
};
