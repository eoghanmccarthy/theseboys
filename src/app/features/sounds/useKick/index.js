import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useKick = () => {
  const kick = useRef(null);

  useEffect(() => {
    kick.current = new Tone.MembraneSynth({
      pitchDecay: 0.02,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0
      },
      oscillator: {
        type: "square4"
      },
      volume: 10
    });
  }, []);

  return kick;
};

export default useKick;
