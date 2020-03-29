import React, { useEffect, useRef, useState } from "react";
import Tone from "tone";

import "./styles.scss";

import { Slider, SliderWithValues } from "componentLib/slider";
import useKeyDownEvent from "componentLib/useKeyDownEvent";
import Volume from "../volume";
import Tempo from "../tempo";
import { Step } from "../steps";
import useKick01 from "features/sounds/useKick";
import useSnare01 from "features/sounds/useSnare";
import useClap01 from "features/sounds/useClap";

const STEP_COUNT = 8;

const initialStepState = {
  kick: [0, 0, 0, 0, 0, 0, 0, 0],
  snare: [0, 0, 0, 0, 0, 0, 0, 0],
  clap: [0, 0, 0, 0, 0, 0, 0, 0]
};

const StepSequencer = () => {
  const gain = useRef(new Tone.Gain(0.8));
  const kick = useKick01();
  const snare = useSnare01();
  const clap = useClap01();

  const dist = useRef(new Tone.Distortion(0.8).toMaster());
  const JCReverb = useRef(new Tone.JCReverb(0.8).toMaster());
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

  const [transportState, setTransportState] = useState("stopped");

  const [stepState, setStepState] = useState(initialStepState);
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

  useKeyDownEvent(e => {
    switch (e.code) {
      case "Space":
        setTransportState(s => {
          if (s === "playing") {
            return "paused";
          }
          if (s === "paused" || s === "stopped") {
            return "playing";
          }
        });
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
    if (transportState === "playing") {
      Tone.Transport.start();
    } else if (transportState === "paused") {
      Tone.Transport.pause();
    } else if (transportState === "stopped") {
      document.getElementById(`progress-indicator`).style.left = "0%";
      Tone.Transport.stop();
    }
  }, [transportState]);

  useEffect(() => {
    synths.current = {
      kick: kick.current.chain(filter.current, Tone.Master),
      snare: snare.current.chain(Tone.Master),
      clap: clap.current.chain(dist.current, JCReverb.current, Tone.Master)
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
        <div>
          <Volume />
          <Tempo />
        </div>
        <div>
          <span>{transportState}</span>
          <button
            onClick={() =>
              setTransportState(s => {
                if (s === "playing") {
                  return "paused";
                }
                if (s === "paused" || s === "stopped") {
                  return "playing";
                }
              })
            }
          >
            {transportState === "playing" ? "pause" : "play"}
          </button>
          <button onClick={() => setTransportState("stopped")}>stop</button>
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
      </div>
      <div className={"tracks-container"}>
        <div className={"sampler"}>
          {Object.entries(stepState).map(([track, steps], i) => (
            <div key={i} className={"track"}>
              <button
                className={"step"}
                style={{ backgroundColor: "darkslategrey" }}
                onClick={() => {
                  triggers(track);
                }}
              />
            </div>
          ))}
        </div>
        <div id={"steps"}>
          <div id={"progress-indicator"} />
          {Object.entries(stepState).map(([track, steps], i) => (
            <div key={i} className={"track"}>
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
            </div>
          ))}
        </div>
        <div className={"sampler"}>
          {Object.entries(stepState).map(([track, steps], i) => (
            <div key={i} className={"track"}>
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
    </div>
  );
};

export default StepSequencer;
