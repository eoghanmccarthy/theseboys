import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useSnare = channel => {
  const hit = useRef(null);
  const rattle = useRef(null);

  useEffect(() => {
    let hitEffect = new Tone.Distortion(0.1).toMaster();
    hit.current = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0
      },
      volume: 4
    }).chain(channel, hitEffect, Tone.Master);
  }, []);

  useEffect(() => {
    let rattleEffect = new Tone.BitCrusher(1).toMaster();
    rattle.current = new Tone.NoiseSynth({
      type: "brown",
      envelope: {
        attack: 0.01,
        decay: 0.001,
        sustain: 0.001,
        release: 0.05
      },
      volume: -16
    }).chain(channel, rattleEffect, Tone.Master);
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("A0", "4n", time);
    rattle.current.triggerAttackRelease("4n", time);
  };

  return {
    play: play
  };
};

export default useSnare;
