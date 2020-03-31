import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useLayoutEffect
} from "react";
import Tone from "tone";

import "./styles.scss";

import { Slider, SliderWithValues } from "componentLib/slider";
import useKeyDownEvent from "componentLib/useKeyDownEvent";
import Volume from "../volume";
import Tempo from "../tempo";
import { Step } from "../steps";
import useKick from "features/soundBank/useKick";
import useSnare from "features/soundBank/useSnare";
import useClap from "features/soundBank/useClap";

const STEP_COUNT = 8;

const initialStepState = {
  track01: [1, 1, 0, 0, 0, 0, 0, 0],
  track02: [1, 0, 0, 0, 0, 1, 0, 0],
  track03: [0, 0, 0, 0, 0, 0, 0, 0]
};

const StepSequencer = () => {
  const [transportState, setTransportState] = useState("stopped");

  const [stepState, setStepState] = useState(initialStepState);
  const stepsRef = useRef(stepState);
  stepsRef.current = stepState;

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

  const [channelsState, setChannelsState] = useState({
    track01: new Tone.Channel(4, 0),
    track02: new Tone.Channel(4, 1),
    track03: new Tone.Channel(4, -1)
  });
  const channels = useRef(channelsState);

  const kick = useKick(channels.current.track01);
  const snare = useSnare(channels.current.track02);
  const clap = useClap(channels.current.track03);

  const soundBank = useMemo(() => {
    return {
      track01: kick,
      track02: snare,
      track03: clap
    };
  }, []);

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
    new Tone.Sequence(
      (time, step) => {
        Object.keys(stepsRef.current).forEach(track => {
          let targetStep = stepsRef.current[track][step];
          if (targetStep === 1) {
            soundBank[track].play(time);
          } else if (targetStep === 2) {
            soundBank[track].play(time);
            soundBank[track].play("+64n");
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
                onClick={() => soundBank[track].play()}
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
                value={channelsState[track].pan.value * 10}
                onChange={e => {
                  let value = e.target.value / 10;
                  setChannelsState(s => {
                    let t = s[track];
                    t.pan.value = value;
                    return {
                      ...s,
                      [track]: t
                    };
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
