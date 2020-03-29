import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useClap = () => {
  const clap = useRef(null);

  useEffect(() => {
    clap.current = new Tone.MetalSynth({
      frequency: 200,
      envelope: {
        attack: 0.08,
        decay: 0.25,
        release: 0.49
      },
      harmonicity: 1,
      modulationIndex: 2,
      resonance: 1277,
      octaves: 1.2
    });
  }, []);

  return clap;
};

export default useClap;
