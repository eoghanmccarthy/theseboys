import React, { useEffect, useRef, createContext, useMemo, useState } from 'react';
import { Destination, Channel, Sequence, FMSynth, AMSynth, MetalSynth } from 'tone';
import { useImmerReducer } from 'use-immer';

export const TrackContext = createContext();

import interpolate from 'utils/helpers/interpolate';

import { initialState, reducer } from 'features/stepSequencer/instrumentsPresetsReducer';

const TrackProvider = ({ children, trackIndex, subDivision, sequencerSteps, track }) => {
  const { channel, instrument, note, steps } = track;

  const channelRef = useRef(new Channel(channel.volume, channel.pan).toDestination());

  const [instrumentsPresetsState, instrumentsPresetsDispatch] = useImmerReducer(
    reducer,
    initialState
  );

  const interpolateVolume = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 12],
    clamp: true
  });

  const [effectsChain, setEffectsChain] = useState([]);

  const instrumentRef = useRef();

  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  useEffect(() => {
    channelRef.current.set({ volume: interpolateVolume(channel.volume) });
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
    if (instrumentsPresetsState[instrument].type === 'fmsynth') {
      instrumentRef.current = new FMSynth(instrumentsPresetsState[instrument].options);
    } else if (instrumentsPresetsState[instrument].type === 'membranesynth') {
      instrumentRef.current = new MetalSynth(instrumentsPresetsState[instrument].options);
    } else if (instrumentsPresetsState[instrument].type === 'amsynth') {
      instrumentRef.current = new AMSynth(instrumentsPresetsState[instrument].options);
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
          instrumentRef.current.triggerAttackRelease(note, '8n', time);
        } else if (targetStep === 2) {
          instrumentRef.current.triggerAttackRelease(note, '8n', time);
          instrumentRef.current.triggerAttackRelease(note, '8n', '+64n');
        }

        // document
        //   .querySelectorAll(`.progress-indicator`)
        //   .forEach(el => (el.style.left = `${(parseInt(step) / STEP_COUNT) * 100}%`));
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
