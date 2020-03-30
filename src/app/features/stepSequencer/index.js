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
  track01: [1, 0, 1, 0, 1, 0, 1, 0],
  track02: [0, 0, 0, 0, 0, 0, 0, 0],
  track03: [1, 1, 1, 1, 1, 0, 1, 1]
};

const StepSequencer = () => {
  const gain = useRef(new Tone.Gain(0.8));

  const [distState, setDistState] = useState(0.8);
  const distRef = useRef({
    distortion: distState
  });

  useEffect(() => {
    distRef.current = new Tone.Distortion();
  }, []);

  useEffect(() => {
    if (distRef.current) {
      distRef.current.distortion = distState;
    }
  }, [distState]);

  const JCReverb = useRef(new Tone.JCReverb(0.8));
  // const filter = useRef(
  //   new Tone.Filter({
  //     type: "lowpass",
  //     frequency: 200
  //   })
  // );

  const [channels, setChannels] = useState({
    track01: new Tone.Channel(-12, 0).toMaster(),
    track02: new Tone.Channel(-12, -0.8).toMaster(),
    track03: new Tone.Channel(-12, 0.88).toMaster()
  });

  const kick = useKick01();
  const snare = useSnare01();
  const clap = useClap01();

  const synths = useRef(null);

  const [transportState, setTransportState] = useState("stopped");

  const [stepState, setStepState] = useState(initialStepState);
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

  useKeyDownEvent(e => {
    switch (e.code) {
      case "Space":
        setTransportState(s => {
          if (s === "paused" || s === "stopped") {
            return "playing";
          } else {
            return "paused";
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
      track01: kick.current.chain(channels.track01, Tone.Master),
      track02: snare.current.chain(channels.track02, Tone.Master),
      track03: clap.current.chain(
        channels.track03,
        distRef.current,
        Tone.Master
      )
    };
  }, []);

  const triggers = (track, time) => {
    let synth = synths.current[track];

    track === "track01" && synth.triggerAttackRelease("c2", "8n", time);
    track === "track02" && synth.triggerAttackRelease("a3", "8n", time);
    track === "track03" && synth.triggerAttackRelease("8n", time);
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
                if (s === "paused" || s === "stopped") {
                  return "playing";
                } else {
                  return "paused";
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
            value={distState * 10}
            onChange={e => setDistState(e.target.value / 10)}
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
              >
                <span>{i}</span>
              </button>
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
