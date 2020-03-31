import React, { useEffect, useRef } from "react";
import Tone from "tone";

const useAudio001 = channel => {
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

const useAudio002 = channel => {
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

const useAudio003 = channel => {
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

export { useAudio001, useAudio002, useAudio003 };
