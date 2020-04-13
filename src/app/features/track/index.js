import React, { useEffect, useRef } from "react";
import Tone from "tone";

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
    new Tone.Channel(channel.volume, channel.pan).toMaster()
  );
  // const reverbRef = useRef(new Tone.Reverb(reverb.decay).toMaster());
  // const autoFilterRef = useRef(
  //   new Tone.AutoFilter(
  //     autoFilter.frequency,
  //     autoFilter.baseFrequency,
  //     autoFilter.octaves
  //   ).toMaster()
  // );

  const instrumentRef = useRef();

  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

  useEffect(() => {
    channelRef.current.volume.value = channel.volume - VOLUME_OFFSET;
    //channelRef.current.volume.set(channel.volume - VOLUME_OFFSET);
  }, [channel.volume]);

  useEffect(() => {
    channelRef.current.pan.value = channel.pan;
  }, [channel.pan]);

  useEffect(() => {
    channelRef.current.mute = channel.mute;
  }, [channel.mute]);

  useEffect(() => {
    channelRef.current.solo = channel.solo;
  }, [channel.solo]);

  // useEffect(() => {
  //   reverbRef.current.preDelay = reverb.preDelay;
  //   reverbRef.current.decay = reverb.decay;
  //   reverbRef.current.wet.value = reverb.wet;
  // }, [reverb]);
  //
  // useEffect(() => {
  //   autoFilterRef.current.baseFrequency = autoFilter.baseFrequency;
  // }, [autoFilter.baseFrequency]);

  useEffect(() => {
    instrumentRef.current = new Tone.FMSynth({
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
    instrumentRef.current.chain(
      // autoFilterRef.current,
      // reverbRef.current,
      channelRef.current,
      Tone.Master
    );
  }, []);

  useEffect(() => {
    new Tone.Sequence(
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
