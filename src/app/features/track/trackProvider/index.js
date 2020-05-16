import React, { useEffect, useRef, createContext, useMemo, useState } from 'react';
import { Destination, Channel, Sequence } from 'tone';

export const TrackContext = createContext();

import getVolume from 'utils/helpers/getVolume';

const TrackProvider = ({ children, trackIndex, subDivision, sequencerSteps, track }) => {
  const { channel, steps, note } = track;

  const channelRef = useRef(new Channel(channel.volume, channel.pan).toDestination());

  const [effectsChain, setEffectsChain] = useState([]);

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
    new Sequence(
      (time, step) => {
        let targetStep = stepsRef.current[step];

        if (targetStep === 1) {
          instrumentRef.current.triggerAttackRelease(note, '8n', time);
        } else if (targetStep === 2) {
          instrumentRef.current.triggerAttackRelease(note, '8n', time);
          instrumentRef.current.triggerAttackRelease(note, '8n', '+32n');
        }

        // document
        //   .querySelectorAll(`.progress-indicator`)
        //   .forEach(el => (el.style.left = `${parseInt(step) * 50}px`));
      },
      sequencerSteps,
      subDivision
    ).start(0);
  }, []);

  const handleAddInstrument = instrument => {
    instrumentRef.current = instrument;
  };

  const handleAddEffect = effect => {
    setEffectsChain(prev => [effect, ...prev]);
  };

  const onPlaySample = () => {
    instrumentRef.current.triggerAttackRelease(note, '8n');
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
