import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useClap = () => {
  const clap = useRef(null);

  useEffect(() => {
    clap.current = new Tone.MetalSynth({
      frequency: 400,
      envelope: {
        attack: 0.002,
        decay: 0.09,
        release: 0.62
      },
      harmonicity: 2,
      modulationIndex: 1,
      resonance: 620,
      octaves: 1.2,
      volume: -20
    });
  }, []);

  return clap;
};

export default useClap;
