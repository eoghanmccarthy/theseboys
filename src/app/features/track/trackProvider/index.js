import React, { useEffect, useRef, createContext, useMemo, useState } from 'react';
import { Destination, Channel, Sequence, context } from 'tone';

export const TrackContext = createContext();

import interpolate from 'utils/helpers/interpolate';

const TrackProvider = ({ children, trackIndex, subDivision, sequencerSteps, track }) => {
  const { channel, steps, note, duration, triggers } = track;

  const channelRef = useRef(new Channel(channel.volume, channel.pan).toDestination());

  const [effectsChain, setEffectsChain] = useState([]);

  const sequencerRef = useRef(null);
  const instrumentRef = useRef(null);

  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  const interpVol = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 20],
    clamp: true
  });

  useEffect(() => {
    channelRef.current.set({ volume: interpVol(channel.volume) });
  }, []);

  useEffect(() => {
    channelRef.current.set({ mute: channel.mute });
  }, []);

  useEffect(() => {
    channelRef.current.set({ pan: channel.pan });
  }, []);

  useEffect(() => {
    instrumentRef.current.chain(...effectsChain, channelRef.current, Destination);
  }, [effectsChain]);

  useEffect(() => {
    sequencerRef.current = new Sequence(
      (time, step) => {
        let targetStep = stepsRef.current[step];

        //https://github.com/Tonejs/Tone.js/issues/306

        if (targetStep === 1) {
          instrumentRef.current.triggerAttackRelease(...triggers, time);
        } else if (targetStep === 2) {
          instrumentRef.current.triggerAttackRelease(...triggers, time);
          instrumentRef.current.triggerAttackRelease(...triggers, '+32n');
        }

        document
          .querySelectorAll(`.progress-indicator`)
          .forEach(el => (el.style.left = `${parseInt(step) * 50}px`));
      },
      sequencerSteps,
      subDivision
    ).start(0);

    return () => {
      if (sequencerRef.current) sequencerRef.current.dispose();
    };
  }, []);

  const handleAddInstrument = instrument => {
    instrumentRef.current = instrument;
  };

  const handleAddEffect = effect => {
    setEffectsChain(prv => [effect, ...prv]);
  };

  const onPlaySample = () => {
    instrumentRef.current.triggerAttackRelease(...triggers);
  };

  const values = useMemo(() => {
    return {
      trackIndex,
      channelRef,
      channel,
      addInstrument: handleAddInstrument,
      addEffect: handleAddEffect,
      onPlaySample
    };
  }, [trackIndex, channelRef, channel]);

  return <TrackContext.Provider value={values}>{children}</TrackContext.Provider>;
};

export default TrackProvider;
