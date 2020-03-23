import React, { Fragment, useEffect, useRef, useState } from "react";
import Tone from "tone";

import "./styles.scss";

import useKeyDownEvent from "componentLib/useKeyDownEvent";

const initialStepState = {
  kick: [0, 0, 0, 0, 0, 0, 0, 0],
  snare: [0, 0, 0, 0, 0, 0, 0, 0],
  clap: [0, 0, 0, 0, 0, 0, 0, 0]
};

const StepSequencer = () => {
  const gain = useRef(new Tone.Gain(0.4).toMaster());
  const distortion = useRef(new Tone.Distortion(0.6).toMaster());
  const filter = useRef(
    new Tone.Filter({
      type: "bandpass",
      Q: 12
    }).toMaster()
  );

  const synths = useRef(null);

  const [pannerState, setPannerState] = useState({
    kick: new Tone.Panner(-1),
    snare: new Tone.Panner(0),
    clap: new Tone.Panner(1)
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
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
  }, [Tone.context]);

  useEffect(() => {
    if (start) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      setCurrentStep(0);
    }
  }, [start]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    synths.current = {
      kick: new Tone.MembraneSynth().chain(
        pannerRef.current["kick"],
        Tone.Master
      ),
      snare: new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).chain(pannerRef.current["snare"], Tone.Master),
      clap: new Tone.MetalSynth({
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
      }).chain(pannerRef.current["clap"], Tone.Master)
    };
  }, []);

  const triggers = (track, time) => {
    let synth = synths.current[track];

    track === "kick" && synth.triggerAttackRelease("c2", "8n", time);
    track === "snare" && synth.triggerAttackRelease("a3", "8n", time);
    track === "clap" && synth.triggerAttackRelease("8n", time);
  };

  useEffect(() => {
    Tone.Transport.scheduleRepeat(time => {
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
        min="0"
        max="100"
        value={Tone.Master.volume.value}
        className="slider"
        id="myRange"
        onChange={e => (Tone.Master.volume.value = e.target.value)}
      />
      <div>
        <span>
          <em>bpm: </em>
          {bpm},
        </span>
        <span>{start ? "playing" : "stopped"},</span>
        <span>step: {currentStep + 1},</span>
        <span>volume: {Tone.Master.volume.value}</span>
        <button onClick={() => (Tone.Master.mute = !Tone.Master.mute)}>
          mute
        </button>
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
