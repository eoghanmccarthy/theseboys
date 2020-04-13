import React, { useEffect, useRef } from "react";
import {
  Destination,
  Channel,
  Sequence,
  FMSynth,
  AMSynth,
  MetalSynth,
  Reverb,
  AutoFilter
} from "tone";

import "./styles.scss";

import Step from "./step";

const STEP_COUNT = 16;
const VOLUME_OFFSET = 60;

const Track = ({
  children,
  index,
  subDivision = "8n",
  sequencerSteps,
  stepState,
  setStepState,
  instrument,
  effectsChain = null,
  channel,
  reverb,
  autoFilter
}) => {
  const channelRef = useRef(
    new Channel(channel.volume, channel.pan).toDestination()
  );
  const reverbRef = useRef(new Reverb(reverb.decay).toDestination());
  const autoFilterRef = useRef(
    new AutoFilter(
      autoFilter.frequency,
      autoFilter.baseFrequency,
      autoFilter.octaves
    ).toDestination()
  );

  const instrumentRef = useRef();

  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

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
    reverbRef.current.set({ wet: reverb.wet });
  }, [reverb.wet]);

  useEffect(() => {
    autoFilterRef.current.set({ baseFrequency: autoFilter.baseFrequency });
  }, [autoFilter.baseFrequency]);

  useEffect(() => {
    if (instrument === "fmsynth") {
      instrumentRef.current = new FMSynth({
        envelope: {
          attack: 0.01,
          decay: 0.1,
          release: 0.4,
          sustain: 0.5
        },
        oscillator: {
          type: "sawtooth8",
          partialCount: 0,
          phase: 135
        }
      });
    } else if (instrument === "membranesynth") {
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
    } else if (instrument === "amsynth") {
      instrumentRef.current = new AMSynth({
        harmonicity: 3,
        detune: 0,
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.01,
          decay: 0.01,
          sustain: 1,
          release: 0.5
        },
        modulation: {
          type: "square"
        },
        modulationEnvelope: {
          attack: 0.5,
          decay: 0,
          sustain: 1,
          release: 0.5
        }
      });
    }

    instrumentRef.current.chain(
      channelRef.current,
      autoFilterRef.current,
      reverbRef.current,
      Destination
    );
    return () => {
      if (instrumentRef.current) {
        instrumentRef.current.dispose();
      }
    };
  }, [instrument]);

  useEffect(() => {
    new Sequence(
      (time, step) => {
        let targetStep = stepsRef.current[step];
        if (targetStep === 1) {
          instrumentRef.current.triggerAttackRelease("c3", "8n", time);
        } else if (targetStep === 2) {
          instrumentRef.current.triggerAttackRelease("c3", "8n", time);
          instrumentRef.current.triggerAttackRelease("c3", "8n", "+64n");
        }
        document
          .querySelectorAll(`.progress-indicator`)
          .forEach(
            el => (el.style.left = `${(parseInt(step) / STEP_COUNT) * 100}%`)
          );
      },
      sequencerSteps,
      subDivision
    ).start(0);
  }, []);

  return (
    <div className={"track"}>
      <div className={"sample"}>
        <button
          onClick={() => instrumentRef.current.triggerAttackRelease("c3", "8n")}
        >
          <span>{index + 1}</span>
        </button>
      </div>
      <div className={"steps"}>
        <div className={"progress-indicator"} />
        {stepState.map((value, i) => {
          return (
            <Step
              key={i}
              index={i}
              value={value}
              stepState={stepState}
              setStepState={setStepState}
            />
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default Track;
