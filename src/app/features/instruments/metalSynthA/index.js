import React, { useRef, memo, useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import {
  Reverb,
  FeedbackDelay,
  Destination,
  Sequence,
  Draw,
  Distortion,
  PitchShift,
  Channel,
  Compressor,
  Gain,
  MetalSynth,
  EQ3,
  Phaser
} from 'tone';

//https://tone-demos.glitch.me/

import { onSequenceStep, setTrackConfig, stepsInitialState } from 'features/utils';

import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import EnvelopeControls from 'features/envelopeControls';
import Eq3Controls from 'features/eq3Controls';
import DistortionControls from 'features/distortionControls';
import ReverbControls from 'features/reverbControls';
import DelayControls from 'features/delayControls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const MetalSynthA = memo(({ trackId, config = {}, channel, initialValue = {} }) => {
  if (!trackId || !channel) return null;

  const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
    setTrackConfig(config)
  );

  const sequence = useRef();
  const compressor = useRef(
    new Compressor({
      threshold: -30,
      ratio: 6,
      attack: 0.3,
      release: 0.1
    })
  );
  const gain = useRef(new Gain(2));
  const eq3 = useRef(new EQ3());
  const distortion = useRef(new Distortion({ distortion: 1, oversample: '4x' }));
  const reverb = useRef(new Reverb({ decay: 4, preDelay: 0.2 }));
  const delay = useRef(
    new FeedbackDelay({ delayTime: `${Math.floor(numSteps / 2)}n`, feedback: 1 / 3 })
  );
  const synth = useRef(
    new MetalSynth({
      harmonicity: 12,
      resonance: 1000,
      modulationIndex: 20,
      volume: -15
    }).chain(
      channel,
      distortion.current,
      reverb.current,
      delay.current,
      eq3.current,
      compressor.current,
      gain.current,
      Destination
    )
  );

  useEffect(() => {
    sequence.current = new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0);
    return () => {
      if (sequence?.current) sequence.current.dispose();
    };
  }, []);

  const onTriggerAttackRelease = (notesToPlay, duration, time, velocity) => {
    if (!synth?.current) return;
    synth.current.triggerAttackRelease(notesToPlay[0], duration, time, velocity);
  };

  const handleOnSequenceStep = (time, column) => {
    onSequenceStep(trackId, notes, numRows, numSteps, time, column, (notesToPlay, velocity) =>
      onTriggerAttackRelease(notesToPlay, noteInterval, time, velocity)
    );
  };

  return (
    <>
      <TrackEffects trackId={trackId}>
        <EffectsGroup span={'1 / span 3'} title={'equaliser'}>
          <Eq3Controls
            trackId={trackId}
            eq3={eq3?.current}
            initialValue={initialValue?.effects?.eq3}
          />
        </EffectsGroup>
        <EffectsGroup span={'5 / span 3'} title={'effects'}>
          <DistortionControls
            trackId={trackId}
            distortion={distortion?.current}
            initialValue={initialValue?.effects?.distortion}
          />
          <ReverbControls
            trackId={trackId}
            reverb={reverb?.current}
            initialValue={initialValue?.effects?.reverb}
          />
          <DelayControls
            trackId={trackId}
            delay={delay?.current}
            initialValue={initialValue?.effects?.delay}
          />
        </EffectsGroup>
        <EffectsGroup span={'9 / span 4'} title={'envelope'}>
          <EnvelopeControls
            trackId={trackId}
            envelope={synth?.current?.envelope}
            initialValue={initialValue?.synth?.envelope}
          />
        </EffectsGroup>
      </TrackEffects>
    </>
  );
});

export default MetalSynthA;
