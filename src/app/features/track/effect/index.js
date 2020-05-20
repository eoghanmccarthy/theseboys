import React, { useEffect, useRef, useContext } from 'react';
import {
  Distortion,
  BitCrusher,
  Tremolo,
  FeedbackDelay,
  AutoFilter,
  Reverb,
  Filter,
  Chorus,
  Phaser,
  EQ3
} from 'tone';

import { TrackContext } from '../trackProvider';

const Effect = ({ type, options }) => {
  const { addEffect } = useContext(TrackContext);

  const effectRef = useRef(null);

  useEffect(() => {
    if (type === 'bitCrusher') {
      effectRef.current = new BitCrusher(options);
    } else if (type === 'distortion') {
      effectRef.current = new Distortion(options);
    } else if (type === 'tremolo') {
      effectRef.current = new Tremolo(options);
    } else if (type === 'feedbackDelay') {
      effectRef.current = new FeedbackDelay(options);
    } else if (type === 'autoFilter') {
      effectRef.current = new AutoFilter(options);
    } else if (type === 'chorus') {
      effectRef.current = new Chorus(options);
    } else if (type === 'reverb') {
      effectRef.current = new Reverb(options);
    } else if (type === 'filter') {
      effectRef.current = new Filter(options);
    } else if (type === 'phaser') {
      effectRef.current = new Phaser(options);
    } else if (type === 'eq3') {
      effectRef.current = new EQ3(options);
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

  useEffect(() => {
    const { frequency } = options;

    if (frequency && effectRef.current?.frequency) {
      effectRef.current.set({ frequency: frequency });
    }
  }, [options.frequency]);

  return null;
};

export default Effect;
