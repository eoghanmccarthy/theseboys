import React, { useEffect, useRef, createContext, useMemo, useState, useContext } from 'react';
import { Destination, Channel, Sequence, FMSynth, AMSynth, MetalSynth } from 'tone';

export const TrackContext = createContext();

const Instrument = ({ instrument }) => {
  const { addInstrument } = useContext(TrackContext);

  const instrumentRef = useRef();

  useEffect(() => {
    if (instrument === 'fmsynth') {
      instrumentRef.current = new FMSynth({
        envelope: {
          attack: 0.01,
          decay: 0.1,
          release: 0.4,
          sustain: 0.5
        },
        oscillator: {
          type: 'sawtooth8',
          partialCount: 0,
          phase: 135
        }
      });
    } else if (instrument === 'membranesynth') {
      instrumentRef.current = new MetalSynth({
        frequency: 200,
        envelope: {
          attack: 0.001,
          decay: 1.4,
          release: 0.2
        },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      });
    } else if (instrument === 'amsynth') {
      instrumentRef.current = new AMSynth({
        harmonicity: 3,
        detune: 0,
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1,
          release: 0.5
        },
        modulation: {
          type: 'square'
        },
        modulationEnvelope: {
          attack: 0.5,
          decay: 0,
          sustain: 1,
          release: 0.5
        }
      });
    }

    if (instrumentRef.current) addInstrument(instrumentRef.current);

    return () => {
      if (instrumentRef.current) {
        instrumentRef.current.dispose();
      }
    };
  }, [instrument]);

  return null;
};

export default Instrument;
