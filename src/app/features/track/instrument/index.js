import React, { useEffect, useRef, useContext } from 'react';
import { FMSynth, MetalSynth, AMSynth, MembraneSynth, NoiseSynth } from 'tone';

import { TrackContext } from '../trackProvider';

const Instrument = ({ instrument }) => {
  const { type, options } = instrument;

  const { envelope } = options;

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

  useEffect(() => {
    const { attack } = envelope;

    if (attack && instrumentRef.current?.envelope?.attack) {
      instrumentRef.current.envelope.set({ attack: attack });
    }
  }, [envelope.attack]);

  useEffect(() => {
    const { decay } = envelope;

    if (decay && instrumentRef.current?.envelope?.decay) {
      instrumentRef.current.envelope.set({ decay: decay });
    }
  }, [envelope.decay]);

  useEffect(() => {
    const { sustain } = envelope;

    if (sustain && instrumentRef.current?.envelope?.sustain) {
      instrumentRef.current.envelope.set({ sustain: sustain });
    }
  }, [envelope.sustain]);

  useEffect(() => {
    const { release } = envelope;

    if (release && instrumentRef.current?.envelope?.release) {
      instrumentRef.current.envelope.set({ release: release });
    }
  }, [envelope.release]);

  return null;
};

export default Instrument;
