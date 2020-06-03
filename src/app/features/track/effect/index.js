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

import interpolate from 'utils/helpers/interpolate';

const Effect = ({ type, options = {} }) => {
  const { addEffect } = useContext(TrackContext);

  const effectRef = useRef(null);

  const interpolateVolume = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 12],
    clamp: true
  });

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
      effectRef.current = new EQ3();
    }

    if (effectRef.current) addEffect(effectRef.current);

    return () => {
      if (effectRef.current) effectRef.current.dispose();
    };
  }, [type]);

  useEffect(() => {
    if (options.wet && effectRef.current?.wet) {
      effectRef.current.set({ wet: options.wet });
    }
  }, [options.wet]);

  useEffect(() => {
    if (typeof options.low !== 'undefined' && effectRef.current?.low) {
      effectRef.current.set({ low: interpolateVolume(options.low) });
    }
  }, [options.low]);

  useEffect(() => {
    if (typeof options.mid !== 'undefined' && effectRef.current?.mid) {
      effectRef.current.set({ mid: interpolateVolume(options.mid) });
    }
  }, [options.mid]);

  useEffect(() => {
    if (typeof options.high !== 'undefined' && effectRef.current?.high) {
      effectRef.current.set({ high: interpolateVolume(options.high) });
    }
  }, [options.high]);

  useEffect(() => {
    if (options.frequency && effectRef.current?.frequency) {
      effectRef.current.set({ frequency: options.frequency });
    }
  }, [options.frequency]);

  return null;
};

export default Effect;
