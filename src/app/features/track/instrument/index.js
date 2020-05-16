import React, { useEffect, useRef, useContext } from 'react';
import { FMSynth, MetalSynth, AMSynth, MembraneSynth } from 'tone';

import { TrackContext } from '../trackProvider';

const Instrument = ({ instrument }) => {
  const { type, options } = instrument;

  const { envelope } = options;

  const { addInstrument } = useContext(TrackContext);

  const ref = useRef(null);

  useEffect(() => {
    if (type === 'fmsynth') {
      ref.current = new FMSynth(options);
    } else if (type === 'membranesynth') {
      ref.current = new MembraneSynth(options);
    } else if (type === 'metalsynth') {
      ref.current = new MetalSynth(options);
    } else if (type === 'amsynth') {
      ref.current = new AMSynth(options);
    }

    if (ref.current) addInstrument(ref.current);

    return () => {
      if (ref.current) ref.current.dispose();
    };
  }, [type]);

  useEffect(() => {
    const { attack } = envelope;

    if (attack && ref.current?.envelope?.attack) {
      ref.current.envelope.set({ attack: attack });
    }
  }, [envelope.attack]);

  useEffect(() => {
    const { decay } = envelope;

    if (decay && ref.current?.envelope?.decay) {
      ref.current.envelope.set({ decay: decay });
    }
  }, [envelope.decay]);

  useEffect(() => {
    const { sustain } = envelope;

    if (sustain && ref.current?.envelope?.sustain) {
      ref.current.envelope.set({ sustain: sustain });
    }
  }, [envelope.sustain]);

  useEffect(() => {
    const { release } = envelope;

    if (release && ref.current?.envelope?.release) {
      ref.current.envelope.set({ release: release });
    }
  }, [envelope.release]);

  return null;
};

export default Instrument;
