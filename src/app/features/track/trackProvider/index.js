import React, { useEffect, useRef, createContext, useMemo, useState } from 'react';
import { Destination, Channel, Sequence, Reverb, FeedbackDelay, Distortion, context } from 'tone';

export const TrackContext = createContext();

import interpolate from 'utils/helpers/interpolate';

const TrackProvider = ({ children, trackIndex, subDivision, sequencerSteps, track }) => {
  const { channel, steps, note, duration, triggers, effects } = track;

  const interpVol = interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 20],
    clamp: true
  });

  const channelRef = useRef(
    new Channel({
      pan: channel.pan,
      volume: interpVol(channel.volume),
      mute: channel.mute,
      solo: false
    })
  );

  const reverbRef = useRef(new Reverb(effects.reverb));
  const feedbackDelayRef = useRef(new FeedbackDelay(effects.feedbackDelay));
  const distortionRef = useRef(new Distortion(effects.distortion));

  const [trackEffectsChain, setTrackEffectsChain] = useState({});

  const sequencerRef = useRef(null);
  const instrumentRef = useRef(null);

  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  useEffect(() => {
    const effectsChain = [];

    for (const effect in trackEffectsChain) {
      effectsChain.push(trackEffectsChain[effect]);
    }

    instrumentRef.current.chain(
      channelRef.current,
      reverbRef.current,
      feedbackDelayRef.current,
      distortionRef.current,
      Destination
    );
  }, [trackEffectsChain]);

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

  const handleAddTrackEffect = effect => {
    Object.entries(effect).map(([name, instance]) => {
      setTrackEffectsChain(chain => {
        return { ...chain, [name]: instance };
      });
    });
  };

  const onPlaySample = () => {
    instrumentRef.current.triggerAttackRelease(...triggers);
  };

  const values = useMemo(() => {
    return {
      trackIndex,
      channelRef,
      reverbRef,
      feedbackDelayRef,
      distortionRef,
      instrumentRef,
      channel,
      addInstrument: handleAddInstrument,
      addTrackEffect: handleAddTrackEffect,
      onPlaySample
    };
  }, [trackIndex, channelRef, trackEffectsChain, instrumentRef, channel]);

  return <TrackContext.Provider value={values}>{children}</TrackContext.Provider>;
};

export default TrackProvider;
