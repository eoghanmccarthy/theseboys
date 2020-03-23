import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Gain,
  Master,
  MembraneSynth,
  MetalSynth,
  Panner,
  Synth,
  Transport,
  Volume
} from "tone";

import "./styles.scss";

import useKeyDownEvent from "componentLib/useKeyDownEvent";

const initialStepState = {
  kick: [0, 0, 0, 0, 0, 0, 0, 0],
  snare: [0, 0, 0, 0, 0, 0, 0, 0],
  clap: [0, 0, 0, 0, 0, 0, 0, 0]
};

const StepSequencer = () => {
  const gain = useRef(new Gain(0.6).toMaster());
  const synths = useRef(null);

  const [pannerState, setPannerState] = useState({
    kick: new Panner(-1),
    snare: new Panner(0),
    clap: new Panner(1)
  });
  const pannerRef = useRef(pannerState);
  pannerRef.current = pannerState;

  const [bpm, setBpm] = useState(120);
  const [start, setStart] = useState(false);

  const [stepState, setStepState] = useState(initialStepState);
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

  const [currentStep, setCurrentStep] = useState(0);
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  useKeyDownEvent(e => {
    switch (e.code) {
      case "Space":
        setStart(s => !s);
        break;
      case "ArrowUp":
        setBpm(b => b + 1);
        break;
      case "ArrowDown":
        setBpm(b => b - 1);
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    if (start) {
      Transport.start();
    } else {
      Transport.stop();
      setCurrentStep(0);
    }
  }, [start]);

  useEffect(() => {
    Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    synths.current = {
      kick: new MembraneSynth().chain(pannerRef.current["kick"], Master),
      snare: new Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).chain(pannerRef.current["snare"], Master),
      clap: new MetalSynth({
        frequency: 200,
        envelope: {
          attack: 0.08,
          decay: 0.25,
          release: 0.49
        },
        harmonicity: 1,
        modulationIndex: 2,
        resonance: 1277,
        octaves: 1.2
      }).chain(pannerRef.current["clap"], Master)
    };
  }, []);

  const triggers = (track, time) => {
    let synth = synths.current[track];

    track === "kick" && synth.triggerAttackRelease("c2", "8n", time);
    track === "snare" && synth.triggerAttackRelease("a3", "8n", time);
    track === "clap" && synth.triggerAttackRelease("8n", time);
  };

  useEffect(() => {
    Transport.scheduleRepeat(time => {
      Object.keys(stepsRef.current).forEach(track => {
        let targetStep = stepsRef.current[track][currentStepRef.current];
        if (targetStep === 1) {
          triggers(track, time);
        } else if (targetStep === 2) {
          triggers(track, time);
          triggers(track, "+32n");
        }
      });
      setCurrentStep(step => {
        return step > 6 ? 0 : step + 1;
      });
    }, "8n");
  }, []);

  return (
    <div className={"step-sequencer"}>
      <input
        type="range"
        min="-100"
        max="100"
        value={Master.volume.value}
        className="slider"
        id="myRange"
        onChange={e => (Master.volume.value = e.target.value)}
      />
      <div>
        <span>
          <em>bpm: </em>
          {bpm},
        </span>
        <span>{start ? "playing" : "stopped"},</span>
        <span>step: {currentStep + 1},</span>
        <span>volume: {Master.volume.value}</span>
        <button onClick={() => (Master.mute = !Master.mute)}>mute</button>
      </div>
      <div className={"steps"}>
        {Object.entries(stepState).map(([track, steps], i) => (
          <div key={i} className={"row"}>
            <button
              className={"step"}
              style={{ backgroundColor: "blue" }}
              onClick={() => {
                triggers(track);
              }}
            />
            {steps.map((s, i) => (
              <button
                key={i}
                className={"step"}
                style={{
                  backgroundColor: `${
                    s === 1 ? "red" : s === 2 ? "green" : "white"
                  }`,
                  opacity: `${start && currentStep === i ? 0.5 : 1}`
                }}
                onClick={e => {
                  e.preventDefault();
                  let shiftEnabled = e.shiftKey === true;
                  let steps = [...stepState[track]];
                  let val =
                    steps[i] === 0
                      ? shiftEnabled
                        ? 2
                        : 1
                      : steps[i] === 1 && shiftEnabled
                      ? 2
                      : steps[i] === 2 && shiftEnabled
                      ? 1
                      : 0;
                  steps[i] = val;
                  setStepState({
                    ...stepState,
                    [track]: steps
                  });
                }}
              />
            ))}
            <input
              type="range"
              min="-10"
              max="10"
              value={pannerState[track].pan.value * 10}
              className="slider"
              id="myRange"
              onChange={e => {
                let value = e.target.value / 10;
                setPannerState({
                  ...pannerState,
                  [track]: value
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepSequencer;
