import React, { useEffect, useRef, useState } from "react";
import Tone from "tone";

const useChorus = (f = 0, dt = 0, d = 0, t = "sine") => {
  const chorus = useRef(new Tone.Chorus(f, dt, d).toMaster());

  const [wet, setWet] = useState(0.5);
  const [frequency, setFrequency] = useState(f);
  const [delayTime, setDelayTime] = useState(dt);
  const [depth, setDepth] = useState(d);
  const [type, setType] = useState(t);
  const [spread, setSpread] = useState(180);

  useEffect(() => {
    chorus.current.wet.value = wet;
  }, [wet]);

  useEffect(() => {
    chorus.current.frequency.value = frequency;
  }, [frequency]);

  useEffect(() => {
    chorus.current.delayTime = delayTime;
  }, [delayTime]);

  useEffect(() => {
    chorus.current.depth = depth;
  }, [depth]);

  useEffect(() => {
    chorus.current.type = type;
  }, [type]);

  useEffect(() => {
    chorus.current.spread = spread;
  }, [spread]);

  return {
    wet: { value: wet, set: setWet },
    frequency: { value: frequency, set: setFrequency },
    delayTime: { value: delayTime, set: setDelayTime },
    depth: { value: depth, set: setDepth },
    type: { value: type, set: setType },
    spread: { value: spread, set: setSpread },
    current: chorus.current
  };
};

export default useChorus;
