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
import TrackControls from 'features/trackControls';
import { TrackSteps } from 'features/trackSteps';
import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import EnvelopeControls from 'features/envelopeControls';
import Eq3Controls from 'features/eq3Controls';
import DistortionControls from 'features/distortionControls';
import ReverbControls from 'features/reverbControls';
import DelayControls from 'features/delayControls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const MetalSynth01 = memo(({ trackId, config = {}, initialValue = {} }) => {
  if (!trackId) return null;

  const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
    setTrackConfig(config)
  );

  const [data] = useImmer(() => stepsInitialState(numRows, numSteps));

  const stepsRef = useRef(data);
  stepsRef.current = data;

  const sequence = useRef();
  const channel = useRef(new Channel());
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
      channel.current,
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
      <TrackControls
        trackId={trackId}
        channel={channel?.current}
        initialValue={initialValue?.channel}
      />
      <TrackSteps
        trackId={trackId}
        numSteps={config?.numSteps ?? 16}
        initialValue={stepsRef?.current}
      />
      <TrackEffects trackId={trackId}>
        <EffectsGroup span={'1 / span 3'} title={'equaliser'}>
          <Eq3Controls trackId={trackId} eq3={eq3?.current} initialValue={initialValue?.eq3} />
        </EffectsGroup>
        <EffectsGroup span={'5 / span 3'} title={'effects'}>
          <DistortionControls
            trackId={trackId}
            distortion={distortion?.current}
            initialValue={initialValue?.distortion}
          />
          <ReverbControls
            trackId={trackId}
            reverb={reverb?.current}
            initialValue={initialValue?.reverb}
          />
          <DelayControls
            trackId={trackId}
            delay={delay?.current}
            initialValue={initialValue?.delay}
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

export default MetalSynth01;
