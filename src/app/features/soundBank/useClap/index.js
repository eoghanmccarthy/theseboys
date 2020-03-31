import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useClap = channel => {
  const hit = useRef(null);

  useEffect(() => {
    let chorus = new Tone.Chorus(4, 3, 1).toMaster();
    hit.current = new Tone.MetalSynth({
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
    }).chain(channel, chorus, Tone.Master);
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("2n", time);
  };

  return {
    play: play
  };
};

export default useClap;
