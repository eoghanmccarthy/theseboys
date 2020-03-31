import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useKick = channel => {
  const hit = useRef(null);

  useEffect(() => {
    let chorus = new Tone.Chorus(4, 3, 1).toMaster();
    hit.current = new Tone.MembraneSynth({
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
      volume: 10
    }).chain(channel, chorus, Tone.Master);
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("c2", "16n", time, 1);
  };

  return {
    play: play
  };
};

export default useKick;
