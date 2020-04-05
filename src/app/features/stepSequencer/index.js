import React, { useEffect, useRef, useState, useMemo, useContext } from "react";
import cx from "classnames";
import Tone from "tone";

import "./styles.scss";

import { TransportContext } from "features/transportProvider";

import { SliderWithValues } from "componentLib/slider";
import Step from "./step";
import useChannel from "features/useChannel";
import {
  useAudio001,
  useAudio002,
  useAudio003,
  useAudio004
} from "features/soundBank";

const STEP_COUNT = 16;

const initialStepState = {
  track01: [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  track02: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  track03: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]
};

const StepSequencer = () => {
  const transportCxt = useContext(TransportContext);
  const { transportState } = transportCxt.value;

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

  const track01Channel = useChannel();
  const track02Channel = useChannel();
  const track03Channel = useChannel();

  const channels = {
    track01: track01Channel,
    track02: track02Channel,
    track03: track03Channel
  };

  const track01Audio = useAudio001(channels.track01.channel);
  const track02Audio = useAudio003(channels.track02.channel);
  const track03Audio = useAudio004(channels.track03.channel);

  const soundBank = useMemo(() => {
    return {
      track01: track01Audio,
      track02: track02Audio,
      track03: track03Audio
    };
  }, []);

  useEffect(() => {
    if (transportState === "stopped") {
      document
        .querySelectorAll(`.progress-indicator`)
        .forEach(el => (el.style.left = "0%"));
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
        document
          .querySelectorAll(`.progress-indicator`)
          .forEach(
            el => (el.style.left = `${(parseInt(step) / STEP_COUNT) * 100}%`)
          );
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "8n"
    ).start(0);
  }, []);

  return (
    <div className={"module step-sequencer"}>
      <div className={"module-head"}>
        <h1>
          <em>01.</em>step sequencer
        </h1>
      </div>
      <div className={"module-main"}>
        <div className={"tracks"}>
          {Object.entries(stepState).map(([track, steps], i) => {
            return (
              <div key={i} className={"track"}>
                <div className={"sample"}>
                  <button onClick={() => soundBank[track].play()}>
                    <span>{i}</span>
                  </button>
                </div>
                <div className={"steps"}>
                  <div className={"progress-indicator"} />
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
                <div className={"channel"}>
                  {/*<Slider*/}
                  {/*  min={-1}*/}
                  {/*  max={1}*/}
                  {/*  step={0.1}*/}
                  {/*  value={channels.current[track].pan.value}*/}
                  {/*  onChange={e => {*/}
                  {/*    let value = e.target.value;*/}
                  {/*    setChannelsState(s => {*/}
                  {/*      let t = s[track];*/}
                  {/*      t.pan.value = value;*/}
                  {/*      return {*/}
                  {/*        ...s,*/}
                  {/*        [track]: t*/}
                  {/*      };*/}
                  {/*    });*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <button
                    className={cx({ active: channels[track].mute.value })}
                    onClick={() => channels[track].mute.set(v => !v)}
                  >
                    mute
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepSequencer;

// <SliderWithValues
//     title={"dist"}
//     min={"0"}
//     max={"10"}
//     value={distState * 10}
//     onChange={e => setDistState(e.target.value / 10)}
// />
// <SliderWithValues
// title={"reverb"}
// min={"0"}
// max={"10"}
// value={JCReverb.current.roomSize.value * 10}
// onChange={e => (JCReverb.current.roomSize.value = e.target.value / 10)}
// />
