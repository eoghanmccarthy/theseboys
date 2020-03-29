import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useSnare = () => {
  const snare = useRef(null);

  useEffect(() => {
    snare.current = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    });
  }, []);

  return snare;
};

export default useSnare;
