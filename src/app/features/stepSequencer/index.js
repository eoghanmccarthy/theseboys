import React, { useEffect, useRef, useState } from "react";
import Tone from "tone";

import "./styles.scss";

import { Slider, SliderWithValues } from "componentLib/slider";

import useKeyDownEvent from "componentLib/useKeyDownEvent";
import Volume from "../volume";
import Tempo from "../tempo";
import { Step } from "../steps";

const STEP_COUNT = 8;

const initialStepState = {
  kick: [0, 0, 0, 0, 0, 0, 0, 0],
  snare: [0, 0, 0, 0, 0, 0, 0, 0],
  clap: [0, 0, 0, 0, 0, 0, 0, 0]
};

const StepSequencer = () => {
  const cxt = useRef(
    new Tone.Context({
      clockSource: "worker",
      latencyHint: "“interactive”",
      lookAhead: 0.1,
      updateInterval: 0.03
    })
  );
  const gain = useRef(new Tone.Gain(0.8));

  const dist = useRef(new Tone.Distortion(0.0));
  const JCReverb = useRef(new Tone.JCReverb(0.5));
  const filter = useRef(
    new Tone.Filter({
      type: "lowpass",
      frequency: 200
    })
  );

  const [channels, setChannels] = useState({
    kick: new Tone.Channel(-12, -0.25).toMaster(),
    snare: new Tone.Channel(-12, -1).toMaster(),
    clap: new Tone.Channel(-12, 0).toMaster()
  });

  const synths = useRef(null);

  // const [pannerState, setPannerState] = useState({
  //   kick: new Tone.Panner(-1).toMaster(),
  //   snare: new Tone.Panner(0).toMaster(),
  //   clap: new Tone.Panner(1).toMaster()
  // });
  // const pannerRef = useRef(pannerState);
  // pannerRef.current = pannerState;

  const [start, setStart] = useState(false);

  const [stepState, setStepState] = useState(initialStepState);
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

  useKeyDownEvent(e => {
    switch (e.code) {
      case "Space":
        setStart(s => !s);
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
      //setCurrentStep(null);
    }
  }, [start]);

  useEffect(() => {
    synths.current = {
      kick: new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.001,
          decay: 0.4,
          sustain: 0.01,
          release: 1.4,
          attackCurve: "exponential"
        }
      }).chain(Tone.Master),
      snare: new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: {
          attack: 0.005,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).chain(Tone.Master),
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
      }).chain(Tone.Master)
    };
  }, []);

  const triggers = (track, time) => {
    let synth = synths.current[track];

    track === "kick" && synth.triggerAttackRelease("c2", "8n", time);
    track === "snare" && synth.triggerAttackRelease("a3", "8n", time);
    track === "clap" && synth.triggerAttackRelease("8n", time);
  };

  useEffect(() => {
    new Tone.Sequence(
      (time, step) => {
        Object.keys(stepsRef.current).forEach(track => {
          let targetStep = stepsRef.current[track][step];
          if (targetStep === 1) {
            triggers(track, time);
          } else if (targetStep === 2) {
            triggers(track, time);
            triggers(track, "+32n");
          }
        });
        document.getElementById(`progress-indicator`).style.left = `${(parseInt(
          step
        ) /
          STEP_COUNT) *
          100}%`;
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      "8n"
    ).start(0);
  }, []);

  return (
    <div className={"step-sequencer"}>
      <div className={"master"}>
        <Volume />
        <Tempo />
        <div>
          <span>{start ? "playing" : "stopped"},</span>
        </div>
      </div>
      <div className={"master"}>
        <SliderWithValues
          title={"dist"}
          min={"0"}
          max={"10"}
          value={dist.current.distortion * 10}
          onChange={e => (dist.current.distortion = e.target.value / 10)}
        />
        <SliderWithValues
          title={"reverb"}
          min={"0"}
          max={"10"}
          value={JCReverb.current.roomSize.value * 10}
          onChange={e =>
            (JCReverb.current.roomSize.value = e.target.value / 10)
          }
        />
      </div>
      <div id={"steps"}>
        <div id={"progress-indicator"} />
        {Object.entries(stepState).map(([track, steps], i) => (
          <div key={i} className={"row"}>
            <button
              className={"step"}
              style={{ backgroundColor: "blue" }}
              onClick={() => {
                triggers(track);
              }}
            />
            {steps.map((value, i) => {
              return (
                <Step
                  key={i}
                  index={i}
                  value={value}
                  stepState={stepState}
                  setStepState={setStepState}
                  track={track}
                />
              );
            })}
            <Slider
              min={-10}
              max={10}
              value={channels[track].pan.value * 10}
              onChange={e => {
                let value = e.target.value / 10;
                setChannels({
                  ...channels,
                  [track]: {
                    ...channels[track],
                    pan: {
                      ...channels[track].pan,
                      value: value
                    }
                  }
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
