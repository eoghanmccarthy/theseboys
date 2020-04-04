import React, { useEffect, useRef, useState, useMemo } from "react";
import Tone from "tone";

import {
  setSoundIndexPrev,
  setSoundIndexNext
} from "utils/helpers/setSoundIndex";

const useAudio001 = channel => {
  const hit = useRef(null);
  const [soundIndex, setSoundIndex] = useState(0);

  const sounds = useMemo(() => {
    return [
      {
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
      }
    ];
  }, []);

  useEffect(() => {
    let chorus = new Tone.Chorus(4, 3, 1).toMaster();
    hit.current = new Tone.MembraneSynth(sounds[soundIndex]).chain(
      channel,
      chorus,
      Tone.Master
    );
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("c2", "16n", time, 1);
  };

  return {
    prev: () => setSoundIndex(i => setSoundIndexPrev(i, sounds.length)),
    next: () => setSoundIndex(i => setSoundIndexNext(i, sounds.length)),
    play: play
  };
};

const useAudio002 = channel => {
  const hit = useRef(null);

  useEffect(() => {
    let bitCrusher = new Tone.BitCrusher(1).toMaster();
    let chorus = new Tone.Chorus(4, 3, 6).toMaster();
    hit.current = new Tone.FMSynth({
      envelope: {
        attack: 0.01,
        decay: 0.1,
        release: 0.4,
        sustain: 0.5
      },
      oscillator: {
        type: "sawtooth8",
        partialCount: 0,
        phase: 135
      }
    }).chain(channel, bitCrusher, chorus, Tone.Master);
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("c3", "8n", time);
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
    let bitCrusher = new Tone.BitCrusher(1).toMaster();
    rattle.current = new Tone.NoiseSynth({
      type: "brown",
      envelope: {
        attack: 0.01,
        decay: 0.001,
        sustain: 0.001,
        release: 0.05
      },
      volume: -16
    }).chain(channel, bitCrusher, Tone.Master);
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("A0", "4n", time);
    rattle.current.triggerAttackRelease("4n", time);
  };

  return {
    play: play
  };
};

const useAudio004 = channel => {
  const hit = useRef(null);
  const [soundIndex, setSoundIndex] = useState(0);

  const sounds = useMemo(() => {
    return [
      {
        polyphony: 4,
        detune: 0,
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.5,
          release: 0.4
        },
        oscillator: {
          type: "sawtooth4"
        },
        volume: -2
      }
    ];
  }, []);

  useEffect(() => {
    let chorus = new Tone.Chorus(2, 2, 1).toMaster();
    let reverb = new Tone.Reverb(2.5).toMaster();
    hit.current = new Tone.PolySynth(6, Tone.Synth, sounds[soundIndex]).chain(
      channel,
      chorus,
      reverb,
      Tone.Master
    );
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("d2", "8n", time);
  };

  return {
    prev: () => setSoundIndex(i => setSoundIndexPrev(i, sounds.length)),
    next: () => setSoundIndex(i => setSoundIndexNext(i, sounds.length)),
    play: play
  };
};

export { useAudio001, useAudio002, useAudio003, useAudio004 };
