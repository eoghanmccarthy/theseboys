import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Destination,
  Chorus,
  MembraneSynth,
  BitCrusher,
  FMSynth,
  Distortion,
  PolySynth,
  Synth,
  NoiseSynth
} from "tone";

import { setIndexPrev, setIndexNext } from "utils/helpers/setSoundIndex";

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
    let chorus = new Chorus(4, 3, 1).toDestination();
    hit.current = new MembraneSynth(sounds[soundIndex]).chain(
      channel,
      chorus,
      Destination
    );
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("c2", "16n", time, 1);
  };

  return {
    prev: () => setSoundIndex(i => setIndexPrev(i, sounds.length)),
    next: () => setSoundIndex(i => setIndexNext(i, sounds.length)),
    play: play
  };
};

const useAudio002 = () => {
  const hit = useRef(null);

  useEffect(() => {
    let bitCrusher = new BitCrusher(1).toDestination();
    let chorus = new Chorus(4, 3, 6).toDestination();
    hit.current = new FMSynth({
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
    }).chain(bitCrusher, chorus, Destination);
  }, []);

  const trigger = time => {
    hit.current.triggerAttackRelease("c3", "8n", time);
  };

  return {
    current: hit.current,
    trigger
  };
};

const useAudio003 = channel => {
  const hit = useRef(null);
  const rattle = useRef(null);

  useEffect(() => {
    let hitEffect = new Distortion(0.1).toDestination();
    hit.current = new MembraneSynth({
      pitchDecay: 0.01,
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0
      },
      volume: 4
    }).chain(channel, hitEffect, Destination);
  }, []);

  useEffect(() => {
    let bitCrusher = new BitCrusher(1).toDestination();
    rattle.current = new NoiseSynth({
      type: "brown",
      envelope: {
        attack: 0.01,
        decay: 0.001,
        sustain: 0.001,
        release: 0.05
      },
      volume: -16
    }).chain(channel, bitCrusher, Destination);
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
    let chorus = new Chorus(2, 2, 1).toDestination();
    let reverb = new Reverb(2.5).toDestination();
    hit.current = new PolySynth(6, Synth, sounds[soundIndex]).chain(
      channel,
      chorus,
      reverb,
      Destination
    );
  }, []);

  const play = time => {
    hit.current.triggerAttackRelease("d2", "8n", time);
  };

  return {
    prev: () => setSoundIndex(i => setIndexPrev(i, sounds.length)),
    next: () => setSoundIndex(i => setIndexNext(i, sounds.length)),
    play: play
  };
};

const useAudio005 = () => {
  const hit = useRef(null);

  useEffect(() => {
    hit.current = new FMSynth({
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
    }).chain(Destination);
  }, []);

  return {
    current: hit.current,
    triggerAttackRelease: time =>
      hit.current.triggerAttackRelease("c3", "8n", time)
  };
};

export { useAudio001, useAudio002, useAudio003, useAudio004, useAudio005 };
