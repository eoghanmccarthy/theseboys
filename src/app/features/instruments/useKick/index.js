import React, { useRef } from 'react';
import { MembraneSynth } from 'tone';

const useKick = () => {
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

  const trigger = () => {
    membrane.current.triggerAttackRelease('C2', '8n');
  };

  return { trigger };
};

export default useKick;
