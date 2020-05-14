import React, { useEffect, useRef, useContext } from 'react';
import { Distortion, BitCrusher, Tremolo, FeedbackDelay, AutoFilter, Reverb } from 'tone';

import { TrackContext } from '../trackProvider';

const Effect = ({ type, options }) => {
  const { addEffect } = useContext(TrackContext);

  const ref = useRef(null);

  useEffect(() => {
    if (type === 'bitCrusher') {
      ref.current = new BitCrusher();
    } else if (type === 'distortion') {
      ref.current = new Distortion();
    } else if (type === 'tremolo') {
      ref.current = new Tremolo();
    } else if (type === 'feedbackDelay') {
      ref.current = new FeedbackDelay();
    } else if (type === 'autoFilter') {
      ref.current = new AutoFilter();
    } else if (type === 'reverb') {
      ref.current = new Reverb();
    }

    if (ref.current) addEffect(ref.current);

    return () => {
      if (ref.current) ref.current.dispose();
    };
  }, [type]);

  useEffect(() => {
    const { wet } = options;

    if (wet && ref.current?.wet) {
      ref.current.set({ wet: wet });
    }
  }, [options.wet]);

  return null;
};

export default Effect;
