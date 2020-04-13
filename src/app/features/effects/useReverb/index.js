import React, { useEffect, useRef, useReducer } from "react";
import { Reverb } from "tone";

import reducer from "../effectReducer";

const useReverb = (decay = 0) => {
  const reverb = useRef(new Reverb(decay).toDestination());

  const [meta, metaDispatch] = useReducer(reducer, {
    decay: 1.5,
    preDelay: 0.01
  });

  useEffect(() => {
    reverb.current.decay = meta.decay;
  }, [meta.decay]);

  useEffect(() => {
    reverb.current.preDelay = meta.preDelay;
  }, [meta.preDelay]);

  return {
    meta: meta,
    set: (p, v) =>
      metaDispatch({ type: "set", payload: { param: p, value: v } }),
    current: reverb.current
  };
};

export default useReverb;
