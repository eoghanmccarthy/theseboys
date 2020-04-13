import React, { useEffect, useRef, useReducer } from "react";
import Tone from "tone";

import reducer from "../effectReducer";

const useChorus = (f = 0, dt = 0, d = 0) => {
  const chorus = useRef(new Tone.Chorus().toMaster());

  const [meta, metaDispatch] = useReducer(reducer, {
    wet: 0.5,
    frequency: f,
    delayTime: dt,
    depth: d
  });

  useEffect(() => {
    chorus.current.wet.value = meta.wet;
  }, [meta.wet]);

  useEffect(() => {
    chorus.current.frequency.value = meta.frequency;
  }, [meta.frequency]);

  useEffect(() => {
    chorus.current.delayTime = meta.delayTime;
  }, [meta.delayTime]);

  useEffect(() => {
    chorus.current.depth = meta.depth;
  }, [meta.depth]);

  return {
    meta: meta,
    set: (p, v) =>
      metaDispatch({ type: "set", payload: { param: p, value: v } }),
    current: chorus.current
  };
};

export default useChorus;
