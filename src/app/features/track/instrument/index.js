import React, { useEffect, useRef, useContext } from 'react';
import { FMSynth, MetalSynth, AMSynth, MembraneSynth, NoiseSynth } from 'tone';

import { TrackContext } from '../trackProvider';

const Instrument = ({ instrument }) => {
  const { type, options } = instrument;

  const { addInstrument } = useContext(TrackContext);

  const instrumentRef = useRef(null);

  useEffect(() => {
    if (type === 'fmsynth') {
      instrumentRef.current = new FMSynth(options);
    } else if (type === 'membranesynth') {
      instrumentRef.current = new MembraneSynth(options);
    } else if (type === 'metalsynth') {
      instrumentRef.current = new MetalSynth(options);
    } else if (type === 'amsynth') {
      instrumentRef.current = new AMSynth(options);
    } else if (type === 'noisesynth') {
      instrumentRef.current = new NoiseSynth(options);
    }

    if (instrumentRef.current) addInstrument(instrumentRef.current);

    return () => {
      if (instrumentRef.current) instrumentRef.current.dispose();
    };
  }, [type]);

  return null;
};

export default Instrument;
