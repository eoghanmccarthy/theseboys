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
  NoiseSynth,
  EQ3,
  Filter
} from 'tone';

//https://tone-demos.glitch.me/

import { onSequenceStep, setTrackConfig, stepsInitialState } from 'features/utils';

import { TrackEffects, EffectsGroup } from 'features/trackEffects';
import EnvelopeControls from 'features/envelopeControls';
import Eq3Controls from 'features/eq3Controls';
import FilterControls from 'features/filterControls';

//const notes = ['A4', 'D3', 'E3', 'G4', 'F#4'];
//const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];

const NoiseSynthA = memo(({ trackId, config = {}, channel, initialValue = {} }) => {
  if (!trackId || !channel) return null;

  const [{ notes, numRows, numSteps, noteInterval, noteIndices }] = useState(() =>
    setTrackConfig(config)
  );

  const sequence = useRef();
  const eq3 = useRef(new EQ3());
  const filter = useRef(new Filter());
  const synth = useRef(
    new NoiseSynth({
      volume: -8,
      noise: {
        type: 'white',
        playbackRate: 5
      }
    }).chain(channel, eq3.current, filter.current, Destination)
  );

  useEffect(() => {
    sequence.current = new Sequence(handleOnSequenceStep, noteIndices, noteInterval).start(0);
    return () => {
      if (sequence?.current) sequence.current.dispose();
    };
  }, []);

  const onTriggerAttackRelease = (duration, time, velocity) => {
    if (!synth?.current) return;
    synth.current.triggerAttackRelease(duration, time, velocity);
  };

  const handleOnSequenceStep = (time, column) => {
    onSequenceStep(trackId, notes, numRows, numSteps, time, column, (notesToPlay, velocity) =>
      onTriggerAttackRelease(noteInterval, time, velocity)
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
        <EffectsGroup span={'5 / span 3'} title={'filter'}>
          <FilterControls
            trackId={trackId}
            filter={filter?.current}
            initialValue={initialValue?.effects?.filter}
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

export default NoiseSynthA;
