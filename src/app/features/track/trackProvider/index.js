import React, { useEffect, useRef, createContext, useMemo, useState } from 'react';
import { Destination, Channel, Sequence, context } from 'tone';

export const TrackContext = createContext();

import getVolume from 'utils/helpers/getVolume';

const TrackProvider = ({ children, trackIndex, subDivision, sequencerSteps, track }) => {
  const { channel, steps, note, duration, triggers } = track;

  const channelRef = useRef(new Channel(channel.volume, channel.pan).toDestination());

  const [effectsChain, setEffectsChain] = useState([]);

  const sequencerRef = useRef(null);
  const instrumentRef = useRef(null);

  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  useEffect(() => {
    channelRef.current.set({ volume: getVolume(channel.volume) });
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
    instrumentRef.current.chain(...effectsChain, channelRef.current, Destination);
  }, [effectsChain]);

  useEffect(() => {
    sequencerRef.current = new Sequence(
      (time, step) => {
        let targetStep = stepsRef.current[step];

        //https://github.com/Tonejs/Tone.js/issues/306

        //console.log(triggers, ...triggers.join(','));

        if (targetStep === 1) {
          instrumentRef.current.triggerAttackRelease(...triggers, time);
        } else if (targetStep === 2) {
          instrumentRef.current.triggerAttackRelease(...triggers, time);
          instrumentRef.current.triggerAttackRelease(...triggers, '+32n');
        }

        //console.log(context.state);

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

  console.log(instrumentRef);

  const handleAddInstrument = instrument => {
    instrumentRef.current = instrument;
  };

  const handleAddEffect = effect => {
    setEffectsChain(prev => [effect, ...prev]);
  };

  const onPlaySample = () => {
    instrumentRef.current.triggerAttackRelease(...triggers);
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
