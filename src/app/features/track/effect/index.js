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
  const { addTrackEffect } = useContext(TrackContext);

  const effectRef = useRef(null);

  const interpolateVolume = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 12],
    clamp: true
  });

  useEffect(() => {
    if (type === 'reverb') {
      effectRef.current = new Reverb(options);
    } else if (type === 'bitCrusher') {
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
    } else if (type === 'filter') {
      effectRef.current = new Filter(options);
    } else if (type === 'phaser') {
      effectRef.current = new Phaser(options);
    } else if (type === 'eq3') {
      effectRef.current = new EQ3();
    }

    if (effectRef.current) addTrackEffect({ [type]: effectRef.current });

    return () => {
      if (effectRef.current) effectRef.current.dispose();
    };
  }, [type]);

  return null;
};

export default Effect;
