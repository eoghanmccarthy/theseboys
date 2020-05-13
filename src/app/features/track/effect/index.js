import React, { useEffect, useRef, useContext } from 'react';
import { Distortion, BitCrusher, Tremolo, FeedbackDelay, AutoFilter, Reverb } from 'tone';

import { TrackContext } from '../trackProvider';

const Effect = ({ type, options }) => {
  const { addEffect } = useContext(TrackContext);

  const effect = useRef(null);

  useEffect(() => {
    if (type === 'bitCrusher') {
      effect.current = new BitCrusher();
    } else if (type === 'distortion') {
      effect.current = new Distortion();
    } else if (type === 'tremolo') {
      effect.current = new Tremolo();
    } else if (type === 'feedbackDelay') {
      effect.current = new FeedbackDelay();
    } else if (type === 'autoFilter') {
      effect.current = new AutoFilter();
    } else if (type === 'reverb') {
      effect.current = new Reverb();
    }

    if (effect.current) {
      addEffect(effect.current);
    }
  }, [type]);

  useEffect(() => {
    if (options.wet && effect.current?.wet) {
      effect.current.set({ wet: options.wet });
    }
  }, [options.wet]);

  useEffect(() => {
    if (options.baseFrequency && effect.current?.baseFrequency) {
      effect.current.set({ baseFrequency: options.baseFrequency });
    }
  }, [options.baseFrequency]);

  useEffect(() => {
    if (options.delayTime && effect.current?.delayTime) {
      effect.current.set({ delayTime: options.delayTime });
    }
  }, [options.delayTime]);

  return null;
};

export default Effect;
