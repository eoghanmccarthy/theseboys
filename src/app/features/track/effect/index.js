import React, { useEffect, useRef, useContext } from 'react';
import { Distortion, BitCrusher, Tremolo, FeedbackDelay, AutoFilter, Reverb } from 'tone';

import { TrackContext } from '../trackProvider';

const Effect = ({ type, wet, baseFrequency, delayTime }) => {
  const { addEffect } = useContext(TrackContext);

  const fx = useRef(null);

  useEffect(() => {
    if (type === 'bitCrusher') {
      fx.current = new BitCrusher();
    } else if (type === 'distortion') {
      fx.current = new Distortion();
    } else if (type === 'tremolo') {
      fx.current = new Tremolo();
    } else if (type === 'feedbackDelay') {
      fx.current = new FeedbackDelay();
    } else if (type === 'autoFilter') {
      fx.current = new AutoFilter();
    } else if (type === 'reverb') {
      fx.current = new Reverb();
    }

    if (fx.current) addEffect(fx.current);
  }, [type]);

  useEffect(() => {
    if (wet && fx.current?.wet) {
      fx.current.set({ wet: wet });
    }
  }, [wet]);

  useEffect(() => {
    if (baseFrequency && fx.current?.baseFrequency) {
      fx.current.set({ baseFrequency: baseFrequency });
    }
  }, [baseFrequency]);

  useEffect(() => {
    if (delayTime && fx.current?.delayTime) {
      fx.current.set({ delayTime: delayTime });
    }
  }, [delayTime]);

  return null;
};

export default Effect;
