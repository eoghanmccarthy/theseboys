import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useKick = () => {
  const kick = useRef(null);

  useEffect(() => {
    kick.current = new Tone.MembraneSynth({
      pitchDecay: 0.04,
      octaves: 2,
      envelope: {
        attack: 0.64,
        decay: 0.4,
        sustain: 0,
        release: 1.4
      },
      oscillator: {
        type: "sine2"
      },
      volume: 12
    });
  }, []);

  return kick;
};

export default useKick;
