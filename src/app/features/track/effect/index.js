import React, { useEffect, useRef, useContext } from 'react';
import { Distortion, BitCrusher, Tremolo, FeedbackDelay, AutoFilter, Reverb, Filter } from 'tone';

import { TrackContext } from '../trackProvider';

const Effect = ({ type, options }) => {
  const { addEffect } = useContext(TrackContext);

  const effectRef = useRef(null);

  useEffect(() => {
    if (type === 'bitCrusher') {
      effectRef.current = new BitCrusher();
    } else if (type === 'distortion') {
      effectRef.current = new Distortion();
    } else if (type === 'tremolo') {
      effectRef.current = new Tremolo();
    } else if (type === 'feedbackDelay') {
      effectRef.current = new FeedbackDelay();
    } else if (type === 'autoFilter') {
      effectRef.current = new AutoFilter();
    } else if (type === 'reverb') {
      effectRef.current = new Reverb();
    } else if (type === 'filter') {
      effectRef.current = new Filter({
        type: 'lowpass',
        frequency: 220
      });
    }

    if (effectRef.current) addEffect(effectRef.current);

    return () => {
      if (effectRef.current) effectRef.current.dispose();
    };
  }, [type]);

  useEffect(() => {
    const { wet } = options;

    if (wet && effectRef.current?.wet) {
      effectRef.current.set({ wet: wet });
    }
  }, [options.wet]);

  return null;
};

export default Effect;
