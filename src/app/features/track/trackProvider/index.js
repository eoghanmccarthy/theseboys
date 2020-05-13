import React, { useEffect, useRef, createContext, useMemo, useState } from 'react';
import { Destination, Channel, Sequence, FMSynth, AMSynth, MetalSynth } from 'tone';

export const TrackContext = createContext();

const STEP_COUNT = 16;
const VOLUME_OFFSET = 60;

const TrackProvider = ({
  children,
  trackIndex,
  subDivision,
  sequencerSteps,
  steps,
  instrument,
  channel
}) => {
  const channelRef = useRef(new Channel(channel.volume, channel.pan).toDestination());

  const [effectsChain, setEffectsChain] = useState([]);

  const instrumentRef = useRef();

  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  useEffect(() => {
    channelRef.current.set({ volume: channel.volume - VOLUME_OFFSET });
  }, [channel.volume]);

  useEffect(() => {
    channelRef.current.set({ pan: channel.pan });
  }, [channel.pan]);

  useEffect(() => {
    channelRef.current.set({ mute: channel.mute });
  }, [channel.mute]);

  useEffect(() => {
    channelRef.current.set({ solo: channel.solo });
  }, [channel.solo]);

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

    instrumentRef.current.chain(channelRef.current, ...effectsChain, Destination);
    return () => {
      if (instrumentRef.current) {
        instrumentRef.current.dispose();
      }
    };
  }, [effectsChain]);

  useEffect(() => {
    new Sequence(
      (time, step) => {
        let targetStep = stepsRef.current[step];
        if (targetStep === 1) {
          instrumentRef.current.triggerAttackRelease('c3', '8n', time);
        } else if (targetStep === 2) {
          instrumentRef.current.triggerAttackRelease('c3', '8n', time);
          instrumentRef.current.triggerAttackRelease('c3', '8n', '+64n');
        }
        document
          .querySelectorAll(`.progress-indicator`)
          .forEach(el => (el.style.left = `${(parseInt(step) / STEP_COUNT) * 100}%`));
      },
      sequencerSteps,
      subDivision
    ).start(0);
  }, []);

  const handleAddInstrument = effect => {
    setEffectsChain(prev => [effect, ...prev]);
  };

  const handleAddEffect = effect => {
    setEffectsChain(prev => [effect, ...prev]);
  };

  const onPlaySample = () => {
    instrumentRef.current.triggerAttackRelease('c3', '8n');
  };

  const values = useMemo(() => {
    return {
      trackIndex,
      addInstrument: handleAddInstrument,
      addEffect: handleAddEffect,
      onPlaySample
    };
  }, []);

  return <TrackContext.Provider value={values}>{children}</TrackContext.Provider>;
};

export default TrackProvider;
