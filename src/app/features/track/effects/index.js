import React, { useEffect, useRef, useContext } from 'react';
import { Reverb, AutoFilter } from 'tone';

import { TrackContext } from '../trackProvider';

const Effects = ({ effects, reverb, autoFilter }) => {
  const { addEffect } = useContext(TrackContext);

  const reverbRef = useRef(new Reverb(reverb.decay).toDestination());
  const autoFilterRef = useRef(
    new AutoFilter(
      autoFilter.frequency,
      autoFilter.baseFrequency,
      autoFilter.octaves
    ).toDestination()
  );

  useEffect(() => {}, [effects]);

  useEffect(() => {
    reverbRef.current.set({ wet: reverb.wet });
  }, [reverb.wet]);

  useEffect(() => {
    autoFilterRef.current.set({ baseFrequency: autoFilter.baseFrequency });
  }, [autoFilter.baseFrequency]);

  return null;
};

export default Effects;
